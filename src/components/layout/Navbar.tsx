import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Bike as BikeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/bikes", label: "Browse Bikes" },
  { to: "/sell", label: "Sell Your Bike" },
];

export const Navbar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary shadow-elegant">
            <BikeIcon className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="text-xl font-extrabold tracking-tight">
            Quick<span className="text-primary">Bikes</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "rounded-md px-4 py-2 text-sm font-medium transition-smooth hover:text-primary",
                pathname === l.to ? "text-primary" : "text-foreground/80"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="outline" size="sm">
            <Link to="/admin">Admin</Link>
          </Button>
          <Button asChild size="sm" className="gradient-primary text-primary-foreground shadow-elegant hover:opacity-90">
            <Link to="/sell">Sell Now</Link>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="rounded-md p-2 md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="container-px mx-auto flex max-w-7xl flex-col py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-3 text-sm font-medium",
                  pathname === l.to ? "bg-secondary text-primary" : "text-foreground/80"
                )}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-sm font-medium text-foreground/80"
            >
              Admin
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
