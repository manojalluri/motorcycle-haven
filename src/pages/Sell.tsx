import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useBikeStore } from "@/store/bikeStore";
import { BRANDS, FUEL_TYPES, FuelType } from "@/data/bikes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, X, CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(3).max(100),
  brand: z.string().min(1),
  model: z.string().trim().min(1).max(80),
  price: z.number().positive().max(10000000),
  year: z.number().int().min(1980).max(new Date().getFullYear() + 1),
  kmDriven: z.number().int().min(0).max(500000),
  fuel: z.enum(["Petrol", "Electric", "Diesel"]),
  ownership: z.string().min(1),
  location: z.string().trim().min(2).max(80),
  description: z.string().trim().min(10).max(1000),
  phone: z.string().regex(/^\d{10,15}$/, "Enter digits only, with country code (e.g. 919999999999)"),
});

const Sell = () => {
  const navigate = useNavigate();
  const addBike = useBikeStore((s) => s.addBike);
  const [images, setImages] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleImages = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files).slice(0, 6 - images.length);
    arr.forEach((f) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) setImages((p) => [...p, e.target!.result as string]);
      };
      reader.readAsDataURL(f);
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") || ""),
      brand: String(fd.get("brand") || ""),
      model: String(fd.get("model") || ""),
      price: Number(fd.get("price")),
      year: Number(fd.get("year")),
      kmDriven: Number(fd.get("kmDriven")),
      fuel: String(fd.get("fuel")) as FuelType,
      ownership: String(fd.get("ownership") || ""),
      location: String(fd.get("location") || ""),
      description: String(fd.get("description") || ""),
      phone: String(fd.get("phone") || "").replace(/\D/g, ""),
    };

    const result = schema.safeParse(raw);
    if (!result.success) {
      const first = result.error.issues[0];
      toast.error(first?.message || "Please fill all fields correctly");
      return;
    }
    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    addBike({
      ...(result.data as Required<typeof result.data>),
      images,
      featured: false,
      sold: false,
    });

    setSubmitted(true);
    toast.success("Listing submitted successfully!");
    setTimeout(() => navigate("/bikes"), 1800);
  };

  if (submitted) {
    return (
      <div className="container-px mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center text-center">
        <CheckCircle2 className="h-16 w-16 text-primary" />
        <h1 className="mt-6 text-3xl font-extrabold">Listing submitted!</h1>
        <p className="mt-2 text-muted-foreground">Redirecting you to all bikes…</p>
      </div>
    );
  }

  return (
    <div className="container-px mx-auto max-w-3xl py-10 md:py-14">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          Sell Your Bike
        </h1>
        <p className="mt-2 text-muted-foreground">
          Fill in the details below. Buyers will contact you directly via WhatsApp.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-card md:p-8"
      >
        {/* IMAGES */}
        <div>
          <Label>Bike Images <span className="text-muted-foreground font-normal">(up to 6)</span></Label>
          <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {images.map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-lg border border-border">
                <img src={img} alt={`upload ${i + 1}`} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImages((p) => p.filter((_, idx) => idx !== i))}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background/90 shadow-sm hover:bg-background"
                  aria-label="Remove image"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            {images.length < 6 && (
              <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-border text-xs text-muted-foreground transition-smooth hover:border-primary hover:bg-secondary/40">
                <Upload className="h-5 w-5" />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleImages(e.target.files)}
                />
              </label>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Bike Name" name="name" placeholder="e.g. Royal Enfield Classic 350" required />
          <div>
            <Label>Brand</Label>
            <Select name="brand" required>
              <SelectTrigger className="mt-2"><SelectValue placeholder="Select brand" /></SelectTrigger>
              <SelectContent>
                {BRANDS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <Field label="Model" name="model" placeholder="e.g. Classic 350" required />
          <Field label="Price (₹)" name="price" type="number" placeholder="180000" required />
          <Field label="Year" name="year" type="number" placeholder="2022" required />
          <Field label="KM Driven" name="kmDriven" type="number" placeholder="8500" required />
          <div>
            <Label>Fuel Type</Label>
            <Select name="fuel" defaultValue="Petrol" required>
              <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
              <SelectContent>
                {FUEL_TYPES.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Ownership</Label>
            <Select name="ownership" defaultValue="1st Owner" required>
              <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
              <SelectContent>
                {["1st Owner", "2nd Owner", "3rd Owner", "4th Owner+"].map((o) => (
                  <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Field label="Location" name="location" placeholder="e.g. Mumbai, MH" required />
          <Field
            label="WhatsApp (with country code)"
            name="phone"
            placeholder="919999999999"
            required
            hint="Digits only, no + or spaces"
          />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            name="description"
            placeholder="Condition, features, service history…"
            rows={5}
            className="mt-2"
            required
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full gradient-primary text-primary-foreground shadow-elegant hover:opacity-90"
        >
          Submit Listing
        </Button>
      </form>
    </div>
  );
};

const Field = ({
  label, name, type = "text", placeholder, required, hint,
}: {
  label: string; name: string; type?: string; placeholder?: string; required?: boolean; hint?: string;
}) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    <Input id={name} name={name} type={type} placeholder={placeholder} required={required} className="mt-2" />
    {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
  </div>
);

export default Sell;
