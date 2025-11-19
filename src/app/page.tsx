import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Apple, BrainCircuit, Facebook, Instagram, Twitter, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container mx-auto flex items-center justify-between px-4 py-6">
        <Logo />
        <Button>
          Activa tu beneficio <ArrowRight className="ml-2" />
        </Button>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto flex flex-col items-center px-4 py-20 text-center sm:py-32">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl md:text-7xl font-headline">
            Tu bienestar, nuestra prioridad.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/80">
            Accede a consultas médicas, nutricionales y psicológicas ilimitadas con tu vale Sí Vale.
          </p>
          <div className="mt-10">
            <Button size="lg">
              Activa tu beneficio ahora <ArrowRight className="ml-2" />
            </Button>
          </div>
        </section>

        {/* What is ima Section */}
        <section id="what-is-ima" className="py-20 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl font-headline flex items-center justify-center gap-2">¿Qué es <Logo height={32} />?</h2>
              <p className="mt-4 text-lg text-foreground/80 flex items-center justify-center gap-1">
                <Logo height={18} /> es tu aliado para el bienestar integral. Te ofrecemos un ecosistema de salud preventiva y correctiva, accesible y fácil de usar.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 sm:max-w-2xl lg:max-w-none lg:grid-cols-3">
              <FeatureCard
                icon={<Stethoscope className="h-8 w-8 text-primary" />}
                title="Consultas ilimitadas"
                description="Habla con médicos generales y especialistas sin costo adicional."
              />
              <FeatureCard
                icon={<Apple className="h-8 w-8 text-primary" />}
                title="Nutrición personalizada"
                description="Planes alimenticios diseñados para tus metas y necesidades."
              />
              <FeatureCard
                icon={<BrainCircuit className="h-8 w-8 text-primary" />}
                title="Soporte psicológico"
                description="Acompañamiento profesional para tu salud mental y emocional."
              />
            </div>
          </div>
        </section>

        {/* Activation Steps Section */}
        <section id="activation" className="py-20 sm:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl font-headline">Así de fácil es activar tu beneficio</h2>
            </div>

            <div className="relative mt-16">
              <div aria-hidden="true" className="absolute inset-x-0 top-12 hidden h-0.5 bg-border lg:block"></div>
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                <ActivationStep
                  step="01"
                  title="Regístrate"
                  description="Crea tu cuenta con tu número de tarjeta Sí Vale."
                />
                <ActivationStep
                  step="02"
                  title="Valida"
                  description="Verificamos tu información para activar tu acceso."
                />
                <ActivationStep
                  step="03"
                  title="Disfruta"
                  description="Agenda tu primera consulta y comienza a cuidarte."
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="bg-primary py-20 text-center sm:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl font-headline">Empieza a cuidar de ti hoy mismo</h2>
            <div className="mt-8">
              <Button size="lg" variant="secondary">
                Activar mi beneficio <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex flex-col items-center gap-4 md:items-start">
              <Logo />
              <p className="text-sm text-foreground/60">© {new Date().getFullYear()} ima. Todos los derechos reservados.</p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-3 md:text-left">
              <FooterLinks title="Legal" links={[{href: "#", text: "Aviso de privacidad"}, {href: "#", text: "Términos y condiciones"}]} />
              <FooterLinks title="Ayuda" links={[{href: "#", text: "Preguntas frecuentes"}, {href: "#", text: "Contacto"}]} />
              <FooterLinks title="Sitios" links={[{href: "#", text: "Sí Vale"}]} />
            </div>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-foreground/60 hover:text-primary" aria-label="Facebook"><Facebook /></Link>
              <Link href="#" className="text-foreground/60 hover:text-primary" aria-label="Instagram"><Instagram /></Link>
              <Link href="#" className="text-foreground/60 hover:text-primary" aria-label="Twitter"><Twitter /></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="border-border/50 bg-transparent text-left transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <CardHeader>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          {icon}
        </div>
        <CardTitle className="text-xl text-primary font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/80">{description}</p>
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
      <h3 className="mt-6 text-xl font-bold text-primary font-headline">{title}</h3>
      <p className="mt-2 text-foreground/80">{description}</p>
    </div>
  );
}

function FooterLinks({ title, links }: { title: string; links: { href: string; text: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="font-bold text-primary font-headline">{title}</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.text}>
            <Link href={link.href} className="text-sm text-foreground/80 hover:text-primary hover:underline">
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
