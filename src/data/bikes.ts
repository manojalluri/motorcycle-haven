import classic350 from "@/assets/bike-classic350.jpg";
import duke390 from "@/assets/bike-duke390.jpg";
import r15 from "@/assets/bike-r15.jpg";
import pulsar from "@/assets/bike-pulsar.jpg";
import cb350 from "@/assets/bike-cb350.jpg";
import apache from "@/assets/bike-apache.jpg";

export type FuelType = "Petrol" | "Electric" | "Diesel";

export interface Bike {
  id: string;
  name: string;
  brand: string;
  model: string;
  price: number;
  year: number;
  kmDriven: number;
  fuel: FuelType;
  ownership: string;
  location: string;
  description: string;
  images: string[];
  /** @deprecated Quick Bikes is the seller — central store contact is used instead. */
  phone?: string;
  featured: boolean;
  sold: boolean;
  createdAt: number;
}

export const initialBikes: Bike[] = [
  {
    id: "1",
    name: "Royal Enfield Classic 350",
    brand: "Royal Enfield",
    model: "Classic 350",
    price: 185000,
    year: 2022,
    kmDriven: 8500,
    fuel: "Petrol",
    ownership: "1st Owner",
    location: "Mumbai, MH",
    description:
      "Excellent condition Classic 350 with full service history. Single owner, garage kept, all original parts. Perfect for highway cruising and city rides.",
    images: [classic350, classic350, classic350],
    phone: "919999999991",
    featured: true,
    sold: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "2",
    name: "KTM Duke 390",
    brand: "KTM",
    model: "Duke 390",
    price: 245000,
    year: 2023,
    kmDriven: 4200,
    fuel: "Petrol",
    ownership: "1st Owner",
    location: "Bengaluru, KA",
    description:
      "Almost new KTM Duke 390. Aggressive styling, sharp handling, and powerful 373cc engine. Maintained at authorized service center.",
    images: [duke390, duke390, duke390],
    phone: "919999999992",
    featured: true,
    sold: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
  },
  {
    id: "3",
    name: "Yamaha YZF R15 V4",
    brand: "Yamaha",
    model: "R15 V4",
    price: 165000,
    year: 2023,
    kmDriven: 5800,
    fuel: "Petrol",
    ownership: "1st Owner",
    location: "Pune, MH",
    description:
      "Race-bred R15 V4 in pristine condition. VVA technology, slipper clutch, and traction control. A true sportbike for enthusiasts.",
    images: [r15, r15, r15],
    phone: "919999999993",
    featured: true,
    sold: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
  {
    id: "4",
    name: "Bajaj Pulsar NS200",
    brand: "Bajaj",
    model: "Pulsar NS200",
    price: 115000,
    year: 2021,
    kmDriven: 18500,
    fuel: "Petrol",
    ownership: "2nd Owner",
    location: "Delhi, DL",
    description:
      "Reliable Pulsar NS200 with liquid-cooled engine. Recently serviced with new tyres. Great mileage and performance combo.",
    images: [pulsar, pulsar, pulsar],
    phone: "919999999994",
    featured: false,
    sold: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
  },
  {
    id: "5",
    name: "Honda CB350 RS",
    brand: "Honda",
    model: "CB350 RS",
    price: 175000,
    year: 2022,
    kmDriven: 11200,
    fuel: "Petrol",
    ownership: "1st Owner",
    location: "Hyderabad, TS",
    description:
      "Retro modern CB350 RS in mint condition. Refined engine with excellent build quality. Perfect daily rider with character.",
    images: [cb350, cb350, cb350],
    phone: "919999999995",
    featured: false,
    sold: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
  },
  {
    id: "6",
    name: "TVS Apache RTR 200 4V",
    brand: "TVS",
    model: "Apache RTR 200 4V",
    price: 105000,
    year: 2021,
    kmDriven: 22000,
    fuel: "Petrol",
    ownership: "1st Owner",
    location: "Chennai, TN",
    description:
      "Sporty Apache RTR 200 with race tuned engine. SmartXonnect Bluetooth connectivity. Well maintained, all papers clear.",
    images: [apache, apache, apache],
    phone: "919999999996",
    featured: true,
    sold: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 14,
  },
];

export const BRANDS = ["Royal Enfield", "KTM", "Yamaha", "Bajaj", "Honda", "TVS", "Suzuki", "Hero"];
export const FUEL_TYPES: FuelType[] = ["Petrol", "Electric", "Diesel"];
