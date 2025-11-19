"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Camera, ArrowRight, Facebook, Instagram, Twitter, CalendarGift } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="container mx-auto flex items-center justify-between px-4 py-6">
        <div className="flex items-center gap-4">
          <Image 
            src="https://firebasestorage.googleapis.com/v0/b/aurora-4e980.appspot.com/o/logos%2FS%C3%AD%20Vale%2FSv_logo1.svg?alt=media&token=5e4d468c-7f2e-48ff-bdc7-9979c61d94ae" 
            alt="Up SíVale Logo"
            width={100}
            height={32}
            className="h-8 w-auto"
          />
          <Image 
            src="https://firebasestorage.googleapis.com/v0/b/aurora-4e980.appspot.com/o/logos%2Fima%2Flogoslonileblue.png?alt=media&token=712acefa-2a3a-411d-9842-f94d944df8ec"
            alt="Ima Logo"
            width={80}
            height={32}
            className="h-8 w-auto"
          />
        </div>
        <Button>
          Activa tu beneficio <ArrowRight className="ml-2" />
        </Button>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto flex flex-col items-center px-4 py-20 text-center sm:py-32">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl font-headline">
            Tu bienestar, nuestra prioridad.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Con Sí Vale, accede a más de 25 herramientas de prevención y bienestar, potenciadas por la inteligencia artificial de ima para que tomes el control de tu salud.
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
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline flex items-center justify-center gap-2">¿Qué es <Image src="https://firebasestorage.googleapis.com/v0/b/aurora-4e980.appspot.com/o/logos%2Fima%2Flogoslonileblue.png?alt=media&token=712acefa-2a3a-411d-9842-f94d944df8ec" alt="Ima Logo" width={120} height={48} className="h-12 w-auto" />?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                <span className="font-bold">ima</span> es tu aliado para el bienestar integral. Te ofrecemos un ecosistema de salud preventiva y correctiva, accesible y fácil de usar.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 sm:max-w-2xl lg:max-w-none lg:grid-cols-2">
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

        {/* Gift Section */}
        <section id="gift" className="py-20 sm:py-24">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center bg-background p-8 sm:p-12 rounded-xl border border-primary/20 shadow-lg shadow-primary/5">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                        <CalendarGift className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline text-primary">Un regalo de Sí Vale para ti</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                        Activa tu beneficio y disfruta de <span className="font-bold text-foreground">un mes de acceso total a ima</span>, cortesía de Sí Vale. Sin costo, sin compromisos.
                    </p>
                    <div className="mt-8">
                        <Button size="lg">
                            Obtener mi mes gratis <ArrowRight className="ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>

        {/* Activation Steps Section */}
        <section id="activation" className="py-20 sm:py-24 bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Así de fácil es activar tu beneficio</h2>
            </div>

            <div className="relative mt-16">
              <div aria-hidden="true" className="absolute inset-x-0 top-12 hidden h-0.5 bg-border lg:block"></div>
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                <ActivationStep
                  step="01"
                  title="Regístrate"
                  description="Haz clic en 'Activar tu beneficio' y completa tu información."
                />
                <ActivationStep
                  step="02"
                  title="Descarga la App"
                  description="Busca 'ima' en la App Store o Google Play y descárgala."
                />
                <ActivationStep
                  step="03"
                  title="Inicia Sesión"
                  description="Usa tu correo y la contraseña que te enviamos para empezar."
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-20 text-center sm:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Empieza a cuidar de ti hoy mismo</h2>
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
              <Image src="https://firebasestorage.googleapis.com/v0/b/aurora-4e980.appspot.com/o/logos%2Fima%2Flogoslonileblue.png?alt=media&token=712acefa-2a3a-411d-9842-f94d944df8ec" alt="Ima Logo" width={160} height={64} className="h-16 w-auto" />
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
