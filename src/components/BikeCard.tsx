import { Link } from "react-router-dom";
import { formatPrice, formatKm } from "@/store/bikeStore";
import type { Bike } from "@/data/bikes";
import { MapPin, Calendar, Fuel, Gauge } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const BikeCard = ({ bike }: { bike: Bike }) => (
  <Link
    to={`/bikes/${bike.id}`}
    className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-smooth hover:-translate-y-1 hover:shadow-card-hover"
  >
    <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
      <img
        src={bike.images[0]}
        alt={bike.name}
        loading="lazy"
        width={1024}
        height={768}
        className="h-full w-full object-cover transition-smooth group-hover:scale-105"
      />
      <div className="absolute left-3 top-3 flex gap-2">
        {bike.featured && (
          <Badge className="gradient-primary text-primary-foreground border-0 shadow-elegant">
            Featured
          </Badge>
        )}
        {bike.sold && (
          <Badge variant="secondary" className="bg-accent text-accent-foreground">
            Sold
          </Badge>
        )}
      </div>
    </div>

    <div className="flex flex-1 flex-col p-5">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="line-clamp-1 text-base font-bold">{bike.name}</h3>
      </div>
      <p className="text-2xl font-extrabold text-primary">{formatPrice(bike.price)}</p>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          <span>{bike.year}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Gauge className="h-3.5 w-3.5" />
          <span>{formatKm(bike.kmDriven)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Fuel className="h-3.5 w-3.5" />
          <span>{bike.fuel}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          <span className="line-clamp-1">{bike.location}</span>
        </div>
      </div>
    </div>
  </Link>
);
