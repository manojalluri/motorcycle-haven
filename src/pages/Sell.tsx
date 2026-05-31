import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { BRANDS, FUEL_TYPES, FuelType } from "@/data/bikes";
import { STORE, buildSellMessage, whatsappLink } from "@/data/store";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, X, CheckCircle2, ShieldCheck, IndianRupee, Clock, MessageCircle } from "lucide-react";

const schema = z.object({
  ownerName: z.string().trim().min(2).max(80),
  phone: z.string().regex(/^\d{10,15}$/, "Enter digits only with country code (e.g. 919876543210)"),
  brand: z.string().min(1),
  model: z.string().trim().min(1).max(80),
  year: z.number().int().min(1980).max(new Date().getFullYear() + 1),
  kmDriven: z.number().int().min(0).max(500000),
  fuel: z.enum(["Petrol", "Electric", "Diesel"]),
  ownership: z.string().min(1),
  expectedPrice: z.number().positive().max(10000000),
  location: z.string().trim().min(2).max(80),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

const Field = ({ label, ...props }: any) => (
  <div>
    <Label>{label}</Label>
    <Input {...props} className="mt-2" />
  </div>
);

const Sell = () => {
  const [images, setImages] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages: string[] = [];
      for (const file of Array.from(e.target.files).slice(0, 6 - images.length)) {
        const resized = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e) => {
            const img = new Image();
            img.src = e.target?.result as string;
            img.onload = () => {
              const canvas = document.createElement("canvas");
              let { width, height } = img;
              if (width > 1000 || height > 1000) {
                const ratio = Math.min(1000 / width, 1000 / height);
                width *= ratio;
                height *= ratio;
              }
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext("2d");
              ctx?.drawImage(img, 0, 0, width, height);
              resolve(canvas.toDataURL("image/jpeg", 0.7));
            };
          };
        });
        newImages.push(resized);
      }
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      ownerName: String(fd.get("ownerName") || ""),
      phone: String(fd.get("phone") || "").replace(/\D/g, ""),
      brand: String(fd.get("brand") || ""),
      model: String(fd.get("model") || ""),
      year: Number(fd.get("year")),
      kmDriven: Number(fd.get("kmDriven")),
      fuel: String(fd.get("fuel")) as FuelType,
      ownership: String(fd.get("ownership") || ""),
      expectedPrice: Number(fd.get("expectedPrice")),
      location: String(fd.get("location") || ""),
      notes: String(fd.get("notes") || ""),
    };

    const result = schema.safeParse(raw);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message || "Please fill all fields correctly");
      return;
    }

    const saveQuote = async () => {
      const { error } = await supabase.from("quotations").insert([{
        ownerName: result.data.ownerName,
        phone: result.data.phone,
        brand: result.data.brand,
        model: result.data.model,
        year: result.data.year,
        kmDriven: result.data.kmDriven,
        fuel: result.data.fuel,
        ownership: result.data.ownership,
        expectedPrice: result.data.expectedPrice,
        location: result.data.location,
        notes: result.data.notes || null,
        images: images,
      }]);

      if (error) {
        console.error(error);
        toast.error("Failed to submit request. Please try again or contact us via WhatsApp.");
      } else {
        setSubmitted(true);
        toast.success("Quotation request submitted successfully!");
      }
    };
    saveQuote();
  };

  if (submitted) {
    return (
      <div className="container-px mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center text-center">
        <CheckCircle2 className="h-16 w-16 text-primary" />
        <h1 className="mt-6 text-3xl font-extrabold">Quote request sent!</h1>
        <p className="mt-2 text-muted-foreground">
          Our team will contact you within 24 hours to schedule a free inspection at your location.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-6 gradient-primary text-primary-foreground shadow-elegant hover:opacity-90"
        >
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-px mx-auto max-w-6xl py-10 md:py-14">
      <div className="mb-8 max-w-2xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          We buy your bike directly
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          Sell Your Bike to Sree Sai Vijaya Durga Auto Finance
        </h1>
        <p className="mt-2 text-muted-foreground">
          Get an instant quote from our team. We inspect, value and pay on the spot —
          no buyer hunting, no haggling, no paperwork hassles.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-card md:p-8"
        >
          <h2 className="text-lg font-bold">Tell us about your bike</h2>

          {/* IMAGES */}
          <div>
            <Label>Bike Photos <span className="font-normal text-muted-foreground">(optional, up to 6)</span></Label>
            <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg border border-border">
                  <img src={img} alt={`upload ${i + 1}`} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImages((p) => p.filter((_, idx) => idx !== i))}
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background/90 hover:bg-background"
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
            <Field label="Your Name" name="ownerName" placeholder="e.g. Rahul Sharma" required />
            <Field
              label="WhatsApp / Phone"
              name="phone"
              placeholder="919876543210"
              required
              hint="Digits only, with country code"
            />
            <Field label="Brand" name="brand" placeholder="e.g. Royal Enfield, Bajaj..." required />
            <Field label="Model" name="model" placeholder="e.g. Classic 350" required />
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
            <Field label="Expected Price (₹)" name="expectedPrice" type="number" placeholder="180000" required />
            <Field label="Your Location" name="location" placeholder="e.g. Mumbai, MH" required />
          </div>

          <div>
            <Label>Additional Notes</Label>
            <Textarea
              name="notes"
              placeholder="Service history, modifications, condition…"
              rows={4}
              className="mt-2"
            />
          </div>

          <div className="flex flex-col mt-4">
            <Button
              type="submit"
              size="lg"
              className="w-full gradient-primary text-primary-foreground shadow-elegant hover:opacity-90 flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Send Quotation Request
            </Button>
          </div>
        </form>

        {/* HOW IT WORKS */}
        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              How it works
            </h3>
            <ol className="mt-4 space-y-4 text-sm">
              {[
                { t: "Submit details", d: "Fill the form or WhatsApp us your bike info." },
                { t: "Free inspection", d: "Our expert visits you and inspects the bike." },
                { t: "Instant quote", d: "Get a fair, transparent offer on the spot." },
                { t: "Sell & get paid", d: "Accept the offer, hand over keys, get paid instantly." },
              ].map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full gradient-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{s.t}</p>
                    <p className="text-muted-foreground">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl gradient-dark p-6 text-accent-foreground shadow-elegant">
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent-foreground/60">
              Why Sree Sai Vijaya Durga
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <IndianRupee className="mt-0.5 h-4 w-4 text-primary" />
                <span>Best market price, paid instantly</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 text-primary" />
                <span>Sale completed in under 24 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                <span>Zero paperwork — we handle RC transfer</span>
              </li>
            </ul>
            <p className="mt-5 text-xs text-accent-foreground/60">
              {STORE.hours} · {STORE.email}
            </p>
          </div>
        </aside>
      </div>
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
