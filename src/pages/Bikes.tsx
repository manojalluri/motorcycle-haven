import { useMemo, useState } from "react";
import { useBikeStore } from "@/store/bikeStore";
import { BikeCard } from "@/components/BikeCard";
import { BRANDS, FUEL_TYPES } from "@/data/bikes";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X } from "lucide-react";

const Bikes = () => {
  const bikes = useBikeStore((s) => s.bikes);
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("all");
  const [fuel, setFuel] = useState("all");
  const [year, setYear] = useState("all");
  const [price, setPrice] = useState<[number, number]>([0, 500000]);
  const [showFilters, setShowFilters] = useState(false);

  const years = useMemo(
    () => Array.from(new Set(bikes.map((b) => b.year))).sort((a, b) => b - a),
    [bikes]
  );

  const filtered = useMemo(() => {
    return bikes.filter((b) => {
      if (search && !b.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (brand !== "all" && b.brand !== brand) return false;
      if (fuel !== "all" && b.fuel !== fuel) return false;
      if (year !== "all" && b.year !== Number(year)) return false;
      if (b.price < price[0] || b.price > price[1]) return false;
      return true;
    });
  }, [bikes, search, brand, fuel, year, price]);

  const reset = () => {
    setSearch("");
    setBrand("all");
    setFuel("all");
    setYear("all");
    setPrice([0, 500000]);
  };

  return (
    <div className="container-px mx-auto max-w-7xl py-10 md:py-14">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          Browse Bikes
        </h1>
        <p className="mt-2 text-muted-foreground">
          {filtered.length} bike{filtered.length !== 1 && "s"} available
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* FILTERS */}
        <aside
          className={`${
            showFilters ? "block" : "hidden"
          } lg:block lg:sticky lg:top-20 lg:self-start`}
        >
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold">Filters</h3>
              <Button variant="ghost" size="sm" onClick={reset}>
                Reset
              </Button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Bike name…"
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Brand</label>
                <Select value={brand} onValueChange={setBrand}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All brands</SelectItem>
                    {BRANDS.map((b) => (
                      <SelectItem key={b} value={b}>{b}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Year</label>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any year</SelectItem>
                    {years.map((y) => (
                      <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Fuel</label>
                <Select value={fuel} onValueChange={setFuel}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All fuel types</SelectItem>
                    {FUEL_TYPES.map((f) => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">Price</span>
                  <span className="text-muted-foreground">
                    ₹{(price[0] / 1000).toFixed(0)}k – ₹{(price[1] / 1000).toFixed(0)}k
                  </span>
                </div>
                <Slider
                  value={price}
                  onValueChange={(v) => setPrice([v[0], v[1]] as [number, number])}
                  min={0}
                  max={500000}
                  step={5000}
                />
              </div>
            </div>
          </div>
        </aside>

        {/* RESULTS */}
        <div>
          <div className="mb-4 flex justify-end lg:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? <X className="mr-1 h-4 w-4" /> : <SlidersHorizontal className="mr-1 h-4 w-4" />}
              {showFilters ? "Hide" : "Filters"}
            </Button>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-16 text-center">
              <p className="text-muted-foreground">No bikes match your filters.</p>
              <Button variant="link" onClick={reset}>Reset filters</Button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((b) => (
                <BikeCard key={b.id} bike={b} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bikes;
