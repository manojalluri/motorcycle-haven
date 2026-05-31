import { create } from "zustand";
import { Bike } from "@/data/bikes";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

interface BikeStore {
  bikes: Bike[];
  session: Session | null;
  loading: boolean;
  fetchBikes: () => Promise<void>;
  addBike: (bike: Omit<Bike, "id" | "createdAt">) => Promise<void>;
  updateBike: (id: string, bike: Partial<Bike>) => Promise<void>;
  deleteBike: (id: string) => Promise<void>;
  toggleSold: (id: string) => Promise<void>;
  toggleFeatured: (id: string) => Promise<void>;
  setSession: (session: Session | null) => void;
}

export const useBikeStore = create<BikeStore>((set, get) => ({
  bikes: [],
  session: null,
  loading: false,

  fetchBikes: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from("bikes")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) {
      console.error(error);
      toast.error("Failed to load bikes");
    } else {
      set({ bikes: data as Bike[] });
    }
    set({ loading: false });
  },

  addBike: async (bike) => {
    const { data, error } = await supabase
      .from("bikes")
      .insert([bike])
      .select()
      .single();

    if (error) {
      console.error(error);
      toast.error("Failed to add bike");
      throw error;
    }

    set((s) => ({ bikes: [data as Bike, ...s.bikes] }));
  },

  updateBike: async (id, patch) => {
    set((s) => ({
      bikes: s.bikes.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    }));

    const { error } = await supabase
      .from("bikes")
      .update(patch)
      .eq("id", id);

    if (error) {
      console.error(error);
      toast.error("Failed to update bike");
      get().fetchBikes();
    }
  },

  deleteBike: async (id) => {
    set((s) => ({ bikes: s.bikes.filter((b) => b.id !== id) }));

    const { error } = await supabase.from("bikes").delete().eq("id", id);

    if (error) {
      console.error(error);
      toast.error("Failed to delete bike");
      get().fetchBikes();
    }
  },

  toggleSold: async (id) => {
    const bike = get().bikes.find((b) => b.id === id);
    if (!bike) return;
    await get().updateBike(id, { sold: !bike.sold });
  },

  toggleFeatured: async (id) => {
    const bike = get().bikes.find((b) => b.id === id);
    if (!bike) return;
    await get().updateBike(id, { featured: !bike.featured });
  },

  setSession: (session) => set({ session }),
}));

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const formatKm = (n: number) =>
  new Intl.NumberFormat("en-IN").format(n) + " km";
