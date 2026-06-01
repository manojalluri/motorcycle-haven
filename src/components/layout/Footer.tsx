import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, MapPin } from "lucide-react";

export const Footer = () => (
  <footer className="border-t border-border/60 bg-accent text-accent-foreground">
    <div className="container-px mx-auto max-w-7xl py-12">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
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

        <div>
          <h4 className="mb-4 text-sm font-semibold">Location</h4>
          <div className="flex flex-col gap-3">
            <a 
              href="https://goo.gl/maps/zMv4UdPTq1UgKCff9?g_st=aw" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-lg border border-accent-foreground/20 transition-opacity hover:opacity-90 bg-accent-foreground/5"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3824.22557991583!2d81.52044811100234!3d16.544621528654033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37d2df4cb6dbd9%3A0xb36340f1a9a83eb7!2sSri%20Vijaya%20Durga%20Finance%20Company!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="120" 
                style={{ border: 0, pointerEvents: "none" }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </a>
            <div className="flex gap-2 items-start text-sm text-accent-foreground/70">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
              <p>
                <span className="font-medium text-accent-foreground">Sree Sai Vijaya Durga Auto Finance</span><br />
                Canal Road, Brindavan Complex,<br />
                Bhimavaram, Andhra Pradesh, India
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-accent-foreground/10 pt-6 text-center text-xs text-accent-foreground/50">
        © {new Date().getFullYear()} Sree Sai Vijaya Durga Auto Finance. All rights reserved.
      </div>
    </div>
  </footer>
);
