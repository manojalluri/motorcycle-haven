import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useBikeStore } from "@/store/bikeStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const isAdmin = useBikeStore((s) => s.isAdmin);
  const login = useBikeStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (isAdmin) return <Navigate to="/admin/dashboard" replace />;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email.trim(), password)) {
      toast.success("Welcome back, admin");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="container-px mx-auto flex min-h-[70vh] max-w-md items-center py-12">
      <div className="w-full rounded-2xl border border-border bg-card p-8 shadow-card">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-primary shadow-elegant">
            <Lock className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Admin Login</h1>
            <p className="text-sm text-muted-foreground">Restricted access</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@quickbikes.com"
              className="mt-2"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-2"
              required
            />
          </div>
          <Button type="submit" className="w-full gradient-primary text-primary-foreground shadow-elegant hover:opacity-90">
            Sign in
          </Button>
        </form>

        <div className="mt-6 rounded-lg border border-dashed border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground">Demo credentials</p>
          <p>Email: <code>admin@quickbikes.com</code></p>
          <p>Password: <code>admin123</code></p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
