import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border/60 bg-accent text-accent-foreground">
    <div className="container-px mx-auto max-w-7xl py-12">
      <div className="grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Sree Sai Vijaya Durga Auto Finance Logo"
              className="h-12 w-12 shrink-0 rounded-lg object-contain"
            />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-extrabold tracking-tight leading-none">
                SREE SAI VIJAYA DURGA
              </span>
              <span className="text-xs sm:text-sm font-bold text-primary mt-0.5">
                AUTO FINANCE BHIMAVARAM
              </span>
            </div>
          </Link>
          <p className="mt-4 max-w-md text-sm text-accent-foreground/70">
            Sree Sai Vijaya Durga Auto Finance finances, inspects and resells premium pre-owned motorcycles across India.
            Every bike is certified — every sale is guaranteed.
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
            <li><Link to="/sell" className="hover:text-primary">Sell to Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold">Contact</h4>
          <ul className="space-y-2 text-sm text-accent-foreground/70">
            <li>
              <a href="mailto:svdaf2015@gmail.com" className="hover:text-primary transition-colors">svdaf2015@gmail.com</a>
            </li>
            <li>
              <a href="tel:+918297666555" className="hover:text-primary transition-colors">+91 8297666555</a>
            </li>
            <li>
              <a href="tel:+917989179668" className="hover:text-primary transition-colors">+91 7989179668</a>
            </li>
            <li>Mon - Sat, 9am - 8pm (Sunday Holiday)</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-accent-foreground/10 pt-6 text-center text-xs text-accent-foreground/50">
        © {new Date().getFullYear()} Sree Sai Vijaya Durga Auto Finance. All rights reserved.
      </div>
    </div>
  </footer>
);
