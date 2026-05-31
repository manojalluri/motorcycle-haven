import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Bike, initialBikes } from "@/data/bikes";

import { Session } from "@supabase/supabase-js";

interface BikeStore {
  bikes: Bike[];
  session: Session | null;
  addBike: (bike: Omit<Bike, "id" | "createdAt">) => void;
  updateBike: (id: string, bike: Partial<Bike>) => void;
  deleteBike: (id: string) => void;
  toggleSold: (id: string) => void;
  toggleFeatured: (id: string) => void;
  setSession: (session: Session | null) => void;
}

export const useBikeStore = create<BikeStore>()(
  persist(
    (set, get) => ({
      bikes: initialBikes,
      session: null,
      addBike: (bike) =>
        set((s) => ({
          bikes: [
            { ...bike, id: crypto.randomUUID(), createdAt: Date.now() },
            ...s.bikes,
          ],
        })),
      updateBike: (id, patch) =>
        set((s) => ({
          bikes: s.bikes.map((b) => (b.id === id ? { ...b, ...patch } : b)),
        })),
      deleteBike: (id) =>
        set((s) => ({ bikes: s.bikes.filter((b) => b.id !== id) })),
      toggleSold: (id) =>
        set((s) => ({
          bikes: s.bikes.map((b) => (b.id === id ? { ...b, sold: !b.sold } : b)),
        })),
      toggleFeatured: (id) =>
        set((s) => ({
          bikes: s.bikes.map((b) =>
            b.id === id ? { ...b, featured: !b.featured } : b
          ),
        })),
      setSession: (session) => set({ session }),
    }),
    {
      name: "sreesaivijayadurga-store",
      partialize: (s) => ({ bikes: s.bikes }),
    }
  )
);

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const formatKm = (n: number) =>
  new Intl.NumberFormat("en-IN").format(n) + " km";
