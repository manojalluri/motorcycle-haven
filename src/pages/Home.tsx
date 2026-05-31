import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap, BadgeIndianRupee, Phone } from "lucide-react";
import { useBikeStore } from "@/store/bikeStore";
import { BikeCard } from "@/components/BikeCard";
import heroBike from "@/assets/ChatGPT Image May 30, 2026, 10_02_06 PM.png";

const trustBadges = [
  { icon: ShieldCheck, label: "100% Verified" },
  { icon: Zap,         label: "Instant Finance" },
  { icon: BadgeIndianRupee, label: "Best Price" },
  { icon: Phone,       label: "24/7 Support" },
];

const Home = () => {
  const bikes = useBikeStore((s) => s.bikes);
  const featured = bikes.filter((b) => b.featured && !b.sold).slice(0, 6);

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative w-full bg-background">
        <img
          src={heroBike}
          alt="Sree Sai Vijaya Durga Auto Finance Banner"
          className="w-full h-auto block"
        />

      </section>

      {/* ── CTA BELOW BANNER ────────────────────────────── */}
      <section className="bg-gradient-to-b from-background to-background/50 border-b border-border/40 py-4 sm:py-6">
        <div className="container-px mx-auto max-w-7xl flex flex-col items-center gap-4 text-center">
          <div className="flex flex-row gap-3 w-full max-w-sm justify-center">
            <Button
              asChild
              className="flex-1 gradient-primary text-primary-foreground font-bold shadow-elegant hover:opacity-90"
            >
              <Link to="/bikes">Browse Bikes</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1 border-foreground/20 bg-background/50 text-foreground backdrop-blur-md font-bold hover:bg-foreground hover:text-background"
            >
              <Link to="/sell">Sell to Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES STRIP ──────────────────────────── */}
      <section className="bg-primary/5 border-y border-primary/15">
        <div className="container-px mx-auto max-w-7xl py-3 sm:py-4">
          <div className="flex items-center justify-around gap-2 sm:gap-6 overflow-x-auto no-scrollbar">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 shrink-0 text-center"
              >
                <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-foreground/80 whitespace-nowrap">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED BIKES ──────────────────────────────── */}
      <section className="relative py-10 sm:py-20 md:py-32 bg-gradient-to-b from-orange-500/5 via-background to-secondary/30 dark:from-orange-950/20 dark:to-background">
        {/* Glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-3xl h-48 bg-primary/10 blur-[80px] rounded-full" />

        <div className="container-px mx-auto max-w-7xl relative z-10">

          {/* Section header */}
          <div className="mb-8 sm:mb-12 flex flex-col items-center text-center px-2">
            <div className="inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary shadow-[0_0_20px_rgba(249,115,22,0.15)]">
              ✦ Featured Selection
            </div>
            <h2
              className="mt-4 animate-fade-in-up font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground"
              style={{ animationDelay: "0.1s" }}
            >
              Hand-Picked{" "}
              <span className="text-gradient">Hot Picks</span>
            </h2>
            <p
              className="mt-3 animate-fade-in-up max-w-xl text-sm sm:text-base md:text-lg text-muted-foreground"
              style={{ animationDelay: "0.2s" }}
            >
              Expertly inspected pre-owned bikes — available for immediate,
              hassle-free financing.
            </p>
          </div>

          {/* ── Mobile: horizontal scroll row ── */}
          <div className="sm:hidden -mx-4 px-4 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar">
            {featured.map((bike) => (
              <div key={bike.id} className="snap-start shrink-0 w-[78vw] max-w-xs">
                <BikeCard bike={bike} />
              </div>
            ))}
            {/* "View all" card */}
            <Link
              to="/bikes"
              className="snap-start shrink-0 w-[78vw] max-w-xs flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 text-primary font-bold text-sm"
            >
              <ArrowRight className="h-8 w-8 opacity-60" />
              View All Bikes
            </Link>
          </div>

          {/* ── Desktop: grid ── */}
          <div className="hidden sm:grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>

          {/* View all — desktop only */}
          <div className="mt-8 hidden sm:flex justify-center">
            <Button
              asChild
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary hover:text-white transition-smooth"
            >
              <Link to="/bikes">
                Explore entire catalog <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────── */}
      <section className="container-px mx-auto max-w-7xl px-4 py-10 md:py-24">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl gradient-dark p-7 sm:p-10 md:p-16 text-accent-foreground shadow-elegant">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-orange-400/20 blur-2xl" />

          <div className="relative z-10 flex flex-col items-start gap-6 sm:gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md">
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-snug">
                Looking to buy or&nbsp;sell a&nbsp;vehicle?
              </h2>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base text-accent-foreground/70">
                Fair prices · Instant financing · Free inspection · Zero paperwork
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto gradient-primary text-primary-foreground shadow-elegant hover:opacity-90 font-bold"
              >
                <Link to="/bikes">Explore Vehicles</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/30 bg-white/5 text-white backdrop-blur-md hover:bg-white hover:text-accent font-bold"
              >
                <Link to="/sell">
                  Sell To Us <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
