import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Sparkles, Headphones, Zap } from "lucide-react";
import { useBikeStore } from "@/store/bikeStore";
import { BikeCard } from "@/components/BikeCard";
import heroBike from "@/assets/hero-bike.jpg";

const Home = () => {
  const bikes = useBikeStore((s) => s.bikes);
  const featured = bikes.filter((b) => b.featured && !b.sold).slice(0, 6);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-accent text-accent-foreground">
        <div className="absolute inset-0">
          <img
            src={heroBike}
            alt="Premium black sport motorcycle with red rim lighting"
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 gradient-hero" />
        </div>

        <div className="container-px relative mx-auto max-w-7xl py-24 md:py-36 lg:py-44">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Inspected · Certified · Sold by Quick Bikes
            </span>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
              Find Your <span className="text-gradient">Dream Bike</span> Today
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/75 md:text-lg">
              Hand-picked, fully inspected pre-owned motorcycles bought and sold by Quick Bikes.
              Buy with confidence, or sell your bike to us in 24 hours.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="gradient-primary text-primary-foreground shadow-elegant hover:opacity-90"
              >
                <Link to="/bikes">
                  View Bikes <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/5 text-white backdrop-blur-md hover:bg-white hover:text-accent"
              >
                <Link to="/sell">Sell Your Bike</Link>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 text-sm text-white/70">
              <div>
                <p className="text-2xl font-bold text-white">500+</p>
                <p>Bikes sold</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">100%</p>
                <p>Inspected & certified</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">24h</p>
                <p>Quote turnaround</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container-px mx-auto max-w-7xl py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { icon: Shield, title: "Inspected & Certified", desc: "Every bike goes through a 50-point quality check" },
            { icon: Zap, title: "Instant WhatsApp Buy", desc: "One-click contact with our showroom team" },
            { icon: Sparkles, title: "Hand-Picked Stock", desc: "We only buy and resell premium-condition bikes" },
            { icon: Headphones, title: "Service & Support", desc: "Post-sale assistance and RC transfer included" },
          ].map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-6 shadow-card transition-smooth hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl gradient-primary shadow-elegant">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-bold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED BIKES */}
      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="container-px mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Featured
              </p>
              <h2 className="mt-1 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                Hot picks this week
              </h2>
            </div>
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link to="/bikes">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-px mx-auto max-w-7xl py-16 md:py-24">
        <div className="relative overflow-hidden rounded-3xl gradient-dark p-10 text-accent-foreground shadow-elegant md:p-16">
          <div className="relative z-10 grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                Want to sell your bike?
              </h2>
              <p className="mt-3 text-accent-foreground/70">
                Skip the buyer hunt. We buy directly from you — fair price, free inspection,
                instant payment, and zero paperwork stress.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Button
                asChild
                size="lg"
                className="gradient-primary text-primary-foreground shadow-elegant hover:opacity-90"
              >
                <Link to="/sell">
                  Get a Quote <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        </div>
      </section>
    </div>
  );
};

export default Home;
