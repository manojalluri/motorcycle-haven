import { Link } from "react-router-dom";
import { Bike as BikeIcon, Instagram, Facebook, Twitter } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border/60 bg-accent text-accent-foreground">
    <div className="container-px mx-auto max-w-7xl py-12">
      <div className="grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <BikeIcon className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              Quick<span className="text-primary">Bikes</span>
            </span>
          </Link>
          <p className="mt-4 max-w-md text-sm text-accent-foreground/70">
            India's premium destination for buying and selling pre-owned motorcycles.
            Verified sellers, transparent pricing, dream rides.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-accent-foreground/20 transition-smooth hover:bg-primary hover:border-primary"
                aria-label="social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold">Explore</h4>
          <ul className="space-y-2 text-sm text-accent-foreground/70">
            <li><Link to="/bikes" className="hover:text-primary">Browse Bikes</Link></li>
            <li><Link to="/sell" className="hover:text-primary">Sell Your Bike</Link></li>
            <li><Link to="/admin" className="hover:text-primary">Admin Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold">Contact</h4>
          <ul className="space-y-2 text-sm text-accent-foreground/70">
            <li>support@quickbikes.com</li>
            <li>+91 99999 99999</li>
            <li>Mon - Sat, 10am - 7pm</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-accent-foreground/10 pt-6 text-center text-xs text-accent-foreground/50">
        © {new Date().getFullYear()} Quick Bikes. All rights reserved.
      </div>
    </div>
  </footer>
);
