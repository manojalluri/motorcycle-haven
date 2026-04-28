import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useBikeStore, formatPrice, formatKm } from "@/store/bikeStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { STORE, buildBuyMessage, whatsappLink } from "@/data/store";
import {
  Calendar, MapPin, Fuel, Gauge, User, Tag, ChevronLeft, ChevronRight, ArrowLeft,
  ShieldCheck, BadgeCheck,
} from "lucide-react";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

const BikeDetails = () => {
  const { id } = useParams();
  const bike = useBikeStore((s) => s.bikes.find((b) => b.id === id));
  const [imgIdx, setImgIdx] = useState(0);

  if (!bike) return <Navigate to="/bikes" replace />;

  const next = () => setImgIdx((i) => (i + 1) % bike.images.length);
  const prev = () => setImgIdx((i) => (i - 1 + bike.images.length) % bike.images.length);

  const whatsappUrl = whatsappLink(buildBuyMessage(bike.name));

  const specs = [
    { label: "Brand", value: bike.brand, icon: Tag },
    { label: "Model", value: bike.model, icon: Tag },
    { label: "Year", value: String(bike.year), icon: Calendar },
    { label: "KM Driven", value: formatKm(bike.kmDriven), icon: Gauge },
    { label: "Fuel", value: bike.fuel, icon: Fuel },
    { label: "Ownership", value: bike.ownership, icon: User },
    { label: "Location", value: bike.location, icon: MapPin },
  ];

  return (
    <div className="container-px mx-auto max-w-7xl py-8 md:py-12">
      <Link
        to="/bikes"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Back to bikes
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        {/* CAROUSEL */}
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-secondary shadow-card">
            <img
              src={bike.images[imgIdx]}
              alt={`${bike.name} image ${imgIdx + 1}`}
              className="h-full w-full object-cover animate-fade-in"
              width={1024}
              height={768}
            />
            {bike.images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 shadow-card backdrop-blur transition-smooth hover:bg-background"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 shadow-card backdrop-blur transition-smooth hover:bg-background"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
            <div className="absolute left-3 top-3 flex gap-2">
              {bike.featured && (
                <Badge className="gradient-primary text-primary-foreground border-0">Featured</Badge>
              )}
              {bike.sold && <Badge variant="secondary" className="bg-accent text-accent-foreground">Sold</Badge>}
            </div>
          </div>

          {bike.images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {bike.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-smooth ${
                    i === imgIdx ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INFO */}
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            {bike.name}
          </h1>
          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" /> {bike.location}</span>
            <span className="inline-flex items-center gap-1 text-primary">
              <BadgeCheck className="h-4 w-4" /> Inspected & Certified by Sree Sai Vijaya Durga Auto Finance
            </span>
          </p>

          <p className="mt-5 text-4xl font-extrabold text-primary md:text-5xl">
            {formatPrice(bike.price)}
          </p>

          <Button
            asChild
            size="lg"
            disabled={bike.sold}
            className="mt-6 w-full bg-[hsl(142,70%,45%)] text-white hover:bg-[hsl(142,70%,40%)] shadow-elegant"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="mr-2 h-5 w-5" />
              {bike.sold ? "Sold" : "Buy via WhatsApp"}
            </a>
          </Button>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Sold and serviced by Sree Sai Vijaya Durga Auto Finance · {STORE.hours}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2 rounded-xl border border-border bg-secondary/40 p-3 text-center text-[11px]">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span className="font-medium">Quality Checked</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <BadgeCheck className="h-4 w-4 text-primary" />
              <span className="font-medium">Verified Papers</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Tag className="h-4 w-4 text-primary" />
              <span className="font-medium">Fair Pricing</span>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-card p-5 shadow-card">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Specifications
            </h3>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
              {specs.map((s) => (
                <div key={s.label}>
                  <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <s.icon className="h-3.5 w-3.5" /> {s.label}
                  </dt>
                  <dd className="mt-1 font-semibold">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-card">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Description
            </h3>
            <p className="text-sm leading-relaxed text-foreground/85">{bike.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeDetails;
