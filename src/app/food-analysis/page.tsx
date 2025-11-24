"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RefreshCcw,
  ArrowLeft,
  Zap,
  Image as ImageIcon,
  Lock,
} from "lucide-react";
import { NutritionCard, FoodAnalysisData } from "@/components/NutritionCard";

type ResponseData = string | Record<string, unknown> | Array<unknown> | null;

export default function FoodAnalysisPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState<string | null>(null);
  const [captureUrl, setCaptureUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [responseData, setResponseData] = useState<ResponseData>(null);
  const [responseError, setResponseError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const startCamera = async () => {
      if (!navigator?.mediaDevices?.getUserMedia) {
        setStatus("error");
        setError("Tu navegador no permite acceso a la cámara.");
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });

        if (!mounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        streamRef.current = stream;
        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          await video.play();
        }
        setStatus("ready");
      } catch (err) {
        console.error(err);
        setStatus("error");
        setError(
          "No pudimos acceder a tu cámara. Revisa los permisos de tu dispositivo."
        );
      }
    };

    startCamera();

    return () => {
      mounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const buildFileFromDataUrl = async (dataUrl: string) => {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    return new File([blob], `food-${Date.now()}.jpg`, {
      type: blob.type || "image/jpeg",
    });
  };

  const resetResponseState = () => {
    setResponseData(null);
    setResponseError(null);
  };

  const handleCapture = () => {
    if (status !== "ready") return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState < 2) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setCaptureUrl(dataUrl);
    resetResponseState();
    setShowPreview(true);

    buildFileFromDataUrl(dataUrl)
      .then((file) => setSelectedFile(file))
      .catch((err) => {
        console.error("No se pudo preparar la imagen para enviar", err);
        setResponseError("No pudimos preparar la imagen para enviarla.");
      });
  };

  // Abrir galería (file picker)
  const handleOpenGallery = () => {
    fileInputRef.current?.click();
  };

  // Cuando el usuario selecciona una foto de la galería
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setCaptureUrl(reader.result);
        setSelectedFile(file);
        resetResponseState();
        setShowPreview(true);
      }
    };
    reader.readAsDataURL(file);

    // Para poder seleccionar el mismo archivo otra vez si quiere
    event.target.value = "";
  };

  const handleEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setEmailError("Por favor ingresa tu correo electrónico.");
      return;
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(trimmedEmail)) {
      setEmailError("Ingresa un correo electrónico válido.");
      return;
    }

    setEmailError(null);
    setEmailModalOpen(false);
  };

  const handleSendRequest = async () => {
    if (!selectedFile) {
      setResponseError("Primero toma o selecciona una foto.");
      return;
    }

    if (!email) {
      setEmailError("Agrega tu correo para continuar.");
      setEmailModalOpen(true);
      return;
    }

    try {
      setIsSending(true);
      setResponseError(null);
      setResponseData(null);

      const formData = new FormData();
      formData.append("email", email);
      formData.append("idApp", "upsivale.mx");
      formData.append("file", selectedFile, selectedFile.name || "foto-comida.jpg");

      const response = await fetch(
        "https://ima-authenticator-703555916890.northamerica-south1.run.app/services/foodPhotoPublic",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer imaSk_2TzfreYK1ufKjOW3Ion6rjrcUh4BVNdWgUZKqT-OUcM",
          },
          body: formData,
        }
      );

      const contentType = response.headers.get("content-type");
      const payload: ResponseData = contentType?.includes("application/json")
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        const message =
          typeof payload === "string"
            ? payload
            : "Ocurrió un error al procesar la imagen.";
        setResponseError(message);
        return;
      }

      setResponseData(payload);
    } catch (err) {
      console.error(err);
      setResponseError("No pudimos enviar la imagen. Inténtalo nuevamente.");
    } finally {
      setIsSending(false);
    }
  };

  const statusMessage =
    status === "loading"
      ? "Activando tu cámara..."
      : error || "Activa los permisos de cámara para continuar.";

  return (
    <div className="relative min-h-screen bg-[#062c30] text-white">
      <header className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-4 pt-6 text-[#d9ff71]">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="text-lg font-semibold">macronutrientes</div>
        <Zap className="h-5 w-5" />
      </header>

      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/0 to-black/60" />

        {status !== "ready" && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 px-6 text-center">
            <span className="text-base text-white">{statusMessage}</span>
          </div>
        )}

        {/* Contenido central (cuadro de enfoque) */}
        <div className="z-10 flex h-full w-full flex-col items-center pt-20">
          <div className="mt-10 h-[340px] w-[320px] rounded-[32px] border-4 border-[#d9ff71]/80 bg-transparent" />
        </div>

        {/* BOTTOM NAVBAR con borde inferior de 16px */}
        <div className="absolute inset-x-0 bottom-[env(safe-area-inset-bottom)] z-20 flex w-full flex-col items-center px-6">
          <div className="mx-auto mb-4 flex w-full max-w-xl items-center justify-between rounded-full bg-[#0b3a3f]/85 px-6 py-4 backdrop-blur shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
            <button
              type="button"
              onClick={handleOpenGallery}
              className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#d9ff71]/80 bg-[#0b3a3f] text-[#d9ff71] shadow-md"
              aria-label="Abrir galería"
            >
              <ImageIcon className="h-7 w-7" />
            </button>

            <button
              type="button"
              onClick={handleCapture}
              className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#0b3a3f] bg-[#d9ff71] shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            >
              <span className="sr-only">Tomar foto</span>
            </button>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#d9ff71]/80 bg-[#0b3a3f] text-[#d9ff71] shadow-md"
            >
              <RefreshCcw className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Input oculto para abrir galería / cámara */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <canvas ref={canvasRef} className="hidden" aria-hidden />

      {showPreview && captureUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#9ff75f]/50 bg-[#0b1c1b] shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between border-b border-[#9ff75f]/30 px-4 py-3">
              <p className="text-sm font-semibold text-[#d9ff71]">Vista previa</p>
              <button
                onClick={() => setShowPreview(false)}
                className="rounded-full bg-[#1c2b24] px-3 py-1 text-xs text-[#d9ff71] transition-colors hover:bg-[#25372d]"
              >
                Cerrar
              </button>
            </div>
            <div className="space-y-4 p-4">
              <div className="overflow-hidden rounded-xl border border-[#9ff75f]/30 bg-black">
                <img
                  src={captureUrl}
                  alt="Captura de comida"
                  className="h-full w-full object-cover"
                />
              </div>
              <Button
                type="button"
                onClick={handleSendRequest}
                disabled={isSending || !selectedFile}
                className="w-full rounded-full bg-[#3d5b35] text-[#e8ff9c] text-base font-semibold hover:bg-[#4a6b43]"
              >
                {isSending ? "Enviando..." : "Enviar para analizar"}
              </Button>

              {responseError && (
                <p className="text-sm text-red-300">{responseError}</p>
              )}

              {!!responseData && (
                <>
                  {typeof responseData === "object" &&
                    responseData !== null &&
                    !Array.isArray(responseData) &&
                    (responseData as any).valid === true ? (
                    <NutritionCard
                      data={responseData as unknown as FoodAnalysisData}
                    />
                  ) : (
                    <div className="space-y-2 rounded-xl border border-[#9ff75f]/30 bg-[#0f2320] p-3">
                      <p className="text-sm font-semibold text-[#d9ff71]">
                        Respuesta del análisis
                      </p>
                      <pre className="max-h-48 overflow-auto whitespace-pre-wrap break-words text-xs text-[#b7f26c]">
                        {typeof responseData === "string"
                          ? responseData
                          : JSON.stringify(responseData, null, 2)}
                      </pre>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {emailModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4">
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#9ff75f]/50 bg-[#0b1c1b] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            <div className="mb-4 flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#162a24] text-[#d9ff71]">
                <Lock className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-[#d9ff71]">
                  Comparte tu correo
                </p>
                <p className="text-sm text-[#b7f26c]">
                  Necesitamos tu correo electrónico para enviarte el resultado y
                  novedades.
                </p>
              </div>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#d9ff71]">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(null);
                  }}
                  className="border-[#9ff75f]/40 bg-[#0f2320] text-[#e8ff9c] placeholder:text-[#7fb85b]"
                  placeholder="tu@correo.com"
                  required
                />
                {emailError && (
                  <p className="text-sm text-red-300">{emailError}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full h-11 rounded-full bg-[#3d5b35] text-[#e8ff9c] text-base font-semibold hover:bg-[#4a6b43]"
              >
                Continuar
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
