import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Bike, initialBikes } from "@/data/bikes";

interface BikeStore {
  bikes: Bike[];
  isAdmin: boolean;
  addBike: (bike: Omit<Bike, "id" | "createdAt">) => void;
  updateBike: (id: string, bike: Partial<Bike>) => void;
  deleteBike: (id: string) => void;
  toggleSold: (id: string) => void;
  toggleFeatured: (id: string) => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

// Demo credentials (frontend-only): admin@quickbikes.com / admin123
const DEMO_EMAIL = "admin@quickbikes.com";
const DEMO_PASS = "admin123";

export const useBikeStore = create<BikeStore>()(
  persist(
    (set, get) => ({
      bikes: initialBikes,
      isAdmin: false,
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
      login: (email, password) => {
        if (email === DEMO_EMAIL && password === DEMO_PASS) {
          set({ isAdmin: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAdmin: false }),
    }),
    {
      name: "quickbikes-store",
      partialize: (s) => ({ bikes: s.bikes, isAdmin: s.isAdmin }),
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
