import { useState, useMemo, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useBikeStore, formatPrice } from "@/store/bikeStore";
import type { Bike } from "@/data/bikes";
import { BRANDS, FUEL_TYPES, FuelType } from "@/data/bikes";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, LogOut, Search, Star, Upload, X, CheckCircle2, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const emptyForm: Omit<Bike, "id" | "createdAt"> = {
  name: "",
  brand: "Royal Enfield",
  model: "",
  price: 0,
  year: new Date().getFullYear(),
  kmDriven: 0,
  fuel: "Petrol",
  ownership: "1st Owner",
  location: "",
  description: "",
  images: [],
  featured: false,
  sold: false,
};

const AdminDashboard = () => {
  const { bikes, session, addBike, updateBike, deleteBike, toggleSold, toggleFeatured, fetchBikes } =
    useBikeStore();

  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Bike | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [quotes, setQuotes] = useState<any[]>([]);

  useEffect(() => {
    fetchBikes();
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    const { data } = await supabase.from("quotations").select("*").order("createdAt", { ascending: false });
    if (data) setQuotes(data);
  };

  const filtered = useMemo(
    () =>
      bikes.filter(
        (b) =>
          b.name.toLowerCase().includes(search.toLowerCase()) ||
          b.brand.toLowerCase().includes(search.toLowerCase()) ||
          b.location.toLowerCase().includes(search.toLowerCase())
      ),
    [bikes, search]
  );

  if (!session) return <Navigate to="/admin" replace />;

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setOpenForm(true);
  };

  const openEdit = (b: Bike) => {
    setEditing(b);
    const { id, createdAt, ...rest } = b;
    setForm(rest);
    setOpenForm(true);
  };

  const handleImages = (files: FileList | null) => {
    if (!files) return;
    Array.from(files)
      .slice(0, 6 - form.images.length)
      .forEach((f) => {
        const r = new FileReader();
        r.onload = (e) =>
          e.target?.result &&
          setForm((p) => ({ ...p, images: [...p.images, e.target!.result as string] }));
        r.readAsDataURL(f);
      });
  };

  const save = () => {
    if (!form.name || !form.price || form.images.length === 0) {
      toast.error("Fill required fields and add at least one image");
      return;
    }
    if (editing) {
      updateBike(editing.id, form);
      toast.success("Bike updated");
    } else {
      addBike(form);
      toast.success("Bike added");
    }
    setOpenForm(false);
  };

  const deleteQuote = async (id: string) => {
    setQuotes((s) => s.filter((q) => q.id !== id));
    await supabase.from("quotations").delete().eq("id", id);
    toast.success("Quotation deleted");
  };

  const toggleReviewQuote = async (id: string) => {
    const quote = quotes.find((q) => q.id === id);
    if (!quote) return;
    setQuotes((s) => s.map((q) => (q.id === id ? { ...q, reviewed: !q.reviewed } : q)));
    await supabase.from("quotations").update({ reviewed: !quote.reviewed }).eq("id", id);
  };

  return (
    <div className="container-px mx-auto max-w-7xl py-8 md:py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {bikes.length} total · {bikes.filter((b) => !b.sold).length} active · {bikes.filter((b) => b.featured).length} featured
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={async () => { await supabase.auth.signOut(); toast.success("Logged out"); }}>
            <LogOut className="mr-1.5 h-4 w-4" /> Logout
          </Button>
          <Dialog open={openForm} onOpenChange={setOpenForm}>
            <DialogTrigger asChild>
              <Button onClick={openNew} className="gradient-primary text-primary-foreground shadow-elegant hover:opacity-90">
                <Plus className="mr-1.5 h-4 w-4" /> Add Bike
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editing ? "Edit Bike" : "Add New Bike"}</DialogTitle>
              </DialogHeader>

              <div className="space-y-4 py-2">
                <div>
                  <Label>Images (up to 6)</Label>
                  <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {form.images.map((img, i) => (
                      <div key={i} className="relative aspect-square overflow-hidden rounded-lg border border-border">
                        <img src={img} alt="" className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setForm((p) => ({ ...p, images: p.images.filter((_, idx) => idx !== i) }))}
                          className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-background/90 hover:bg-background"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    {form.images.length < 6 && (
                      <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-border text-xs text-muted-foreground hover:border-primary">
                        <Upload className="h-4 w-4" />
                        <span>Upload</span>
                        <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleImages(e.target.files)} />
                      </label>
                    )}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <FormInput label="Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <FormSelect
                    label="Brand"
                    value={form.brand}
                    options={BRANDS}
                    onChange={(v) => setForm({ ...form, brand: v })}
                  />
                  <FormInput label="Model" value={form.model} onChange={(v) => setForm({ ...form, model: v })} />
                  <FormInput label="Price *" type="number" value={String(form.price)} onChange={(v) => setForm({ ...form, price: Number(v) })} />
                  <FormInput label="Year" type="number" value={String(form.year)} onChange={(v) => setForm({ ...form, year: Number(v) })} />
                  <FormInput label="KM Driven" type="number" value={String(form.kmDriven)} onChange={(v) => setForm({ ...form, kmDriven: Number(v) })} />
                  <FormSelect
                    label="Fuel"
                    value={form.fuel}
                    options={FUEL_TYPES}
                    onChange={(v) => setForm({ ...form, fuel: v as FuelType })}
                  />
                  <FormSelect
                    label="Ownership"
                    value={form.ownership}
                    options={["1st Owner", "2nd Owner", "3rd Owner", "4th Owner+"]}
                    onChange={(v) => setForm({ ...form, ownership: v })}
                  />
                  <FormInput label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={4}
                    className="mt-2"
                  />
                </div>

                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
                    <Label>Featured</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={form.sold} onCheckedChange={(v) => setForm({ ...form, sold: v })} />
                    <Label>Sold</Label>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenForm(false)}>Cancel</Button>
                <Button onClick={save} className="gradient-primary text-primary-foreground hover:opacity-90">
                  {editing ? "Save changes" : "Create bike"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="inventory">
        <div className="mb-4 flex items-center justify-between gap-4 flex-wrap">
          <TabsList>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="quotes">
              Quotations {quotes.length > 0 && <Badge variant="secondary" className="ml-2">{quotes.length}</Badge>}
            </TabsTrigger>
          </TabsList>

          <div className="relative max-w-sm flex-1 md:max-w-xs md:ml-auto">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, brand, location…"
              className="pl-9"
            />
          </div>
        </div>

        <TabsContent value="inventory" className="mt-0">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <div className="overflow-x-auto">
              <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bike</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden md:table-cell">Year</TableHead>
                <TableHead className="hidden lg:table-cell">Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={b.images[0]} alt="" className="h-12 w-16 rounded-md object-cover" />
                      <div>
                        <p className="font-semibold">{b.name}</p>
                        <p className="text-xs text-muted-foreground">{b.brand}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">{formatPrice(b.price)}</TableCell>
                  <TableCell className="hidden md:table-cell">{b.year}</TableCell>
                  <TableCell className="hidden lg:table-cell">{b.location}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {b.sold ? (
                        <Badge variant="secondary">Sold</Badge>
                      ) : (
                        <Badge variant="outline" className="border-primary/40 text-primary">Active</Badge>
                      )}
                      {b.featured && (
                        <Badge className="gradient-primary text-primary-foreground border-0">★</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        title={b.featured ? "Unfeature" : "Feature"}
                        onClick={() => toggleFeatured(b.id)}
                      >
                        <Star className={`h-4 w-4 ${b.featured ? "fill-primary text-primary" : ""}`} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleSold(b.id)}
                      >
                        {b.sold ? "Mark Active" : "Mark Sold"}
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => openEdit(b)} title="Edit">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="icon" variant="ghost" title="Delete">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete this bike?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove "{b.name}" from listings.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => { deleteBike(b.id); toast.success("Bike deleted"); }}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                    No bikes found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="quotes" className="mt-0">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Bike Details</TableHead>
                    <TableHead>Expected Price</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotes.map((q, i) => (
                    <TableRow key={i} className={q.reviewed ? "opacity-60 bg-muted/20" : ""}>
                      <TableCell>
                        <p className="font-semibold">{q.ownerName}</p>
                        <p className="text-xs text-muted-foreground">{q.phone}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-semibold">{q.brand} {q.model} ({q.year})</p>
                        <p className="text-xs text-muted-foreground">{q.kmDriven}km · {q.fuel} · {q.ownership}</p>
                      </TableCell>
                      <TableCell className="font-semibold">{formatPrice(q.expectedPrice)}</TableCell>
                      <TableCell>{q.location}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(q.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            title={q.reviewed ? "Mark as unread" : "Mark as reviewed"}
                            onClick={() => toggleReviewQuote(q.id)}
                          >
                            <CheckCircle2 className={`h-4 w-4 ${q.reviewed ? "text-primary" : "text-muted-foreground"}`} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            title="Contact on WhatsApp"
                            asChild
                          >
                            <a href={`https://wa.me/${q.phone}?text=${encodeURIComponent(`Hi ${q.ownerName}, we are reaching out regarding your quote request for the ${q.brand} ${q.model}.`)}`} target="_blank" rel="noreferrer">
                              <MessageCircle className="h-4 w-4 text-green-600" />
                            </a>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="icon" variant="ghost" title="Delete">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete quotation?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently remove the quote request from {q.ownerName}.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteQuote(q.id)}
                                  className="bg-destructive hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {quotes.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                        No quotation requests yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const FormInput = ({
  label, value, onChange, type = "text",
}: { label: string; value: string; onChange: (v: string) => void; type?: string }) => (
  <div>
    <Label>{label}</Label>
    <Input value={value} onChange={(e) => onChange(e.target.value)} type={type} className="mt-2" />
  </div>
);

const FormSelect = ({
  label, value, options, onChange,
}: { label: string; value: string; options: string[]; onChange: (v: string) => void }) => (
  <div>
    <Label>{label}</Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
      <SelectContent>
        {options.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
      </SelectContent>
    </Select>
  </div>
);

export default AdminDashboard;
