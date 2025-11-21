"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";

type ResponsePayload = string | Record<string, unknown>;

export default function AgeEstimationPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [error, setError] = useState<string | null>(null);
  const [captureUrl, setCaptureUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [responseData, setResponseData] = useState<ResponsePayload | null>(
    null
  );
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
          video: { facingMode: "user" },
          audio: false,
        });

        if (!mounted) {
          stream.getTracks().forEach((track) => track.stop());
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
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const buildFileFromDataUrl = async (dataUrl: string) => {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    return new File([blob], `face-${Date.now()}.jpg`, {
      type: blob.type || "image/jpeg",
    });
  };

  const resetResponseState = () => {
    setResponseData(null);
    setResponseError(null);
  };

  const statusMessage =
    status === "loading"
      ? "Activando tu cámara frontal..."
      : error || "Activa los permisos de cámara para continuar.";

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
      setResponseError("Primero toma una foto.");
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
      formData.append("file", selectedFile, selectedFile.name || "foto-rostro.jpg");

      const response = await fetch(
        "https://ima-authenticator-703555916890.northamerica-south1.run.app/services/cronosPublic",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer imaSk_2TzfreYK1ufKjOW3Ion6rjrcUh4BVNdWgUZKqT-OUcM",
          },
          body: formData,
        }
      );

      let payload: ResponsePayload;

      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        payload = await response.json();
      } else {
        payload = await response.text();
      }

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#04292d] via-[#04292d] to-[#031b1d] text-[#d9ff71] flex flex-col items-center px-6 py-10">
      <div className="w-full max-w-3xl flex flex-col items-center text-center gap-6">
        <div className="text-xl font-semibold uppercase tracking-[0.3em] text-[#c0f45a]">
          Cronos
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#d9ff71]">
            Estimación de Edad
          </h1>
          <p className="mx-auto max-w-2xl text-[#a7e45b] text-base sm:text-lg flex items-center justify-center gap-2">
            <span>
              🔒 Tu privacidad es nuestra prioridad. La imagen se procesa de
              forma segura y solo tú tendrás acceso a ella.
            </span>
          </p>
        </div>
      </div>

      <div className="relative mt-12 h-[320px] w-[320px] sm:h-[400px] sm:w-[400px]">
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,#9bf75d4d,transparent_60%)] blur-3xl"
        />
        <div className="relative flex h-full w-full items-center justify-center">
          <div
            role="button"
            tabIndex={0}
            onClick={handleCapture}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCapture();
              }
            }}
            className="relative h-full w-full overflow-hidden rounded-full border border-[#9ff75f]/60 bg-[#0a1b1a] shadow-[0_0_60px_12px_rgba(147,255,109,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9ff75f]/70"
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="h-full w-full object-cover"
            />
            {status !== "ready" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 px-6 text-center text-white">
                <span className="text-sm sm:text-base">{statusMessage}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="mt-10 text-center text-lg text-[#c7ff6b] max-w-xl">
        Toca el círculo para tomar la foto cuando tengas tu rostro centrado
      </p>

      <div className="mt-10 w-full max-w-xl">
        <Button
          asChild
          className="w-full h-12 rounded-full bg-[#3d5b35] text-[#e8ff9c] text-lg font-semibold shadow-md hover:bg-[#4a6b43]"
        >
          <Link href="/">Omitir</Link>
        </Button>
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden />

      {showPreview && captureUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#9ff75f]/50 bg-[#0b1c1b] shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between border-b border-[#9ff75f]/30 px-4 py-3">
              <p className="text-sm font-semibold text-[#d9ff71]">
                Vista previa
              </p>
              <button
                onClick={() => setShowPreview(false)}
                className="rounded-full bg-[#1c2b24] px-3 py-1 text-xs text-[#d9ff71] hover:bg-[#25372d] transition-colors"
              >
                Cerrar
              </button>
            </div>
            <div className="p-4">
              <div className="overflow-hidden rounded-xl border border-[#9ff75f]/30 bg-black">
                <img
                  src={captureUrl}
                  alt="Captura de rostro"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-3 px-4 pb-4">
              <Button
                type="button"
                onClick={handleSendRequest}
                disabled={isSending || !selectedFile}
                className="w-full h-11 rounded-full bg-[#3d5b35] text-[#e8ff9c] text-base font-semibold shadow-md hover:bg-[#4a6b43]"
              >
                {isSending ? "Enviando..." : "Enviar para estimar"}
              </Button>

              {responseError && (
                <p className="text-sm text-red-300">{responseError}</p>
              )}

              {responseData !== null && (
                <div className="space-y-2 rounded-xl border border-[#9ff75f]/30 bg-[#0f2320] p-3">
                  <p className="text-sm font-semibold text-[#d9ff71]">
                    Respuesta
                  </p>
                  <pre className="max-h-48 overflow-auto whitespace-pre-wrap break-words text-xs text-[#b7f26c]">
                    {typeof responseData === "string"
                      ? responseData
                      : JSON.stringify(responseData, null, 2)}
                  </pre>
                </div>
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
