"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Camera, MessageCircle, Facebook, Instagram, Twitter, ArrowRight } from "lucide-react";
import Link from "next/link";

const ImaLogo = ({ className }: { className?: string }) => (
  <svg
    width="160"
    height="60"
    viewBox="0 0 170 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M11.3963 0C5.10185 0 0 5.10185 0 11.3963C0 17.6907 5.10185 22.7926 11.3963 22.7926C17.6907 22.7926 22.7926 17.6907 22.7926 11.3963C22.7926 5.10185 17.6907 0 11.3963 0Z" fill="#D2F252"/>
    <path d="M1.37036 30.6481H21.4259V53.2963H1.37036V30.6481Z" fill="#D2F252"/>
    <path d="M62.0642 30.6481C48.0691 30.6481 36.8518 41.8654 36.8518 55.8605C36.8518 69.8556 48.0691 81.0728 62.0642 81.0728C76.0592 81.0728 87.2765 69.8556 87.2765 55.8605V53.2963H36.8518V55.8605C36.8518 56.5815 36.9603 57.2765 37.1629 57.9407C39.0605 63.8123 44.6642 68.2259 51.5457 68.2259H72.7728C70.0765 75.8247 62.0642 81.0728 53.9407 81.0728C44.6642 81.0728 36.8518 73.2605 36.8518 63.984C36.8518 54.7074 44.6642 46.9938 53.9407 46.9938C57.1951 46.9938 60.1926 47.9049 62.7876 49.4951L62.0642 30.6481Z" transform="translate(-1.0, -22.5)" fill="#D2F252"/>
    <path d="M126.936 55.8605C126.936 41.8654 115.719 30.6481 101.724 30.6481C87.7289 30.6481 76.5116 41.8654 76.5116 55.8605C76.5116 69.8556 87.7289 81.0728 101.724 81.0728C115.719 81.0728 126.936 69.8556 126.936 55.8605ZM101.724 68.2259C95.4295 68.2259 90.2178 62.9198 90.2178 55.8605C90.2178 48.8012 95.4295 43.4951 101.724 43.4951C108.018 43.4951 113.23 48.8012 113.23 55.8605C113.23 62.9198 108.018 68.2259 101.724 68.2259Z" transform="translate(-2.5, -22.5)" fill="#D2F252"/>
    <path d="M129.568 30.6481H147.068V53.2963H129.568V30.6481Z" transform="translate(-4, -22.5)" fill="#D2F252"/>
    <path d="M149 54.3457C149 48.0512 154.102 42.9494 160.396 42.9494C166.691 42.9494 171.793 48.0512 171.793 54.3457C171.793 60.6401 166.691 65.742 160.396 65.742C154.102 65.742 149 60.6401 149 54.3457Z" fill="#D2F252"/>
    <text style={{whiteSpace: 'pre'}} fill="#D2F252" fontWeight="bold" fontSize="9" fontFamily="Sora, sans-serif" letterSpacing="0.025em">
      <tspan x="1" y="62">mi asistente de salud inteligente</tspan>
    </text>
  </svg>
);

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="container mx-auto flex items-center justify-end px-4 py-6">
        <Button>
          Activa tu beneficio <ArrowRight className="ml-2" />
        </Button>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto flex flex-col items-center px-4 py-20 text-center sm:py-32">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl font-headline">
            Tu bienestar, nuestra prioridad.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Accede a consultas médicas, nutricionales y psicológicas ilimitadas con tu vale Sí Vale.
          </p>
          <div className="mt-10">
            <Button size="lg">
              Activa tu beneficio ahora <ArrowRight className="ml-2" />
            </Button>
          </div>
        </section>

        {/* What is ima Section */}
        <section id="what-is-ima" className="py-20 sm:py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline flex items-center justify-center gap-2">¿Qué es <ImaLogo />?</h2>
              <p className="mt-4 text-lg text-muted-foreground flex items-center justify-center gap-1">
                <ImaLogo /> es tu aliado para el bienestar integral. Te ofrecemos un ecosistema de salud preventiva y correctiva, accesible y fácil de usar.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 sm:max-w-2xl lg:max-w-4xl lg:grid-cols-2">
              <FeatureCard
                icon={<Sparkles className="h-8 w-8 text-primary" />}
                title="Descubre de cuántos años te vez"
                description="Usa nuestra IA para analizar tu rostro y estimar tu edad."
              />
              <FeatureCard
                icon={<Camera className="h-8 w-8 text-primary" />}
                title="Analiza tu comida con una foto"
                description="Toma una foto de tu platillo y conoce sus detalles nutricionales."
              />
            </div>
          </div>
        </section>

        {/* Activation Steps Section */}
        <section id="activation" className="py-20 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Así de fácil es activar tu beneficio</h2>
            </div>

            <div className="relative mt-16">
              <div aria-hidden="true" className="absolute inset-x-0 top-12 hidden h-0.5 bg-border lg:block"></div>
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                <ActivationStep
                  step="01"
                  title="Regístrate"
                  description="Haz clic en 'Activar tu beneficio' y completa el formulario."
                />
                <ActivationStep
                  step="02"
                  title="Descarga la App"
                  description="Encuentra 'ima' en la App Store o Google Play y descárgala."
                />
                <ActivationStep
                  step="03"
                  title="Ingresa y Disfruta"
                  description="Inicia sesión con tu correo y la contraseña que te enviamos."
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="bg-secondary/50 py-20 text-center sm:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Empieza a cuidar de ti hoy mismo</h2>
            <div className="mt-8">
              <Button size="lg">
                Activar mi beneficio <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex flex-col items-center gap-4 md:items-start">
              <ImaLogo />
              <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} ima. Todos los derechos reservados.</p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-3 md:text-left">
              <FooterLinks title="Legal" links={[{href: "#", text: "Aviso de privacidad"}, {href: "#", text: "Términos y condiciones"}]} />
              <FooterLinks title="Ayuda" links={[{href: "#", text: "Preguntas frecuentes"}, {href: "#", text: "Contacto"}]} />
              <FooterLinks title="Sitios" links={[{href: "#", text: "Sí Vale"}]} />
            </div>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Facebook"><Facebook /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Instagram"><Instagram /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary" aria-label="Twitter"><Twitter /></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="bg-background/80 text-left transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <CardHeader>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          {icon}
        </div>
        <CardTitle className="text-xl text-foreground font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function ActivationStep({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="relative text-center">
      <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-background border-2 border-primary mx-auto">
        <span className="text-4xl font-bold text-primary">{step}</span>
      </div>
      <h3 className="mt-6 text-xl font-bold text-foreground font-headline">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}

function FooterLinks({ title, links }: { title: string; links: { href: string; text: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="font-bold text-foreground font-headline">{title}</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.text}>
            <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary hover:underline">
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
