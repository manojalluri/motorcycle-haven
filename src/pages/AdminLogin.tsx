import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useBikeStore } from "@/store/bikeStore";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const session = useBikeStore((s) => s.session);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const ADMIN_EMAIL = "vnbalusu@gmail.com";

  if (session) return <Navigate to="/admin/dashboard" replace />;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      toast.error("Unauthorized email address.");
      return;
    }

    setLoading(true);

    if (isResetMode) {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });
      setLoading(false);
      if (!error) {
        toast.success("Password reset email sent! Check your inbox.");
        setIsResetMode(false);
      } else {
        toast.error(error.message);
      }
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);

    if (!error) {
      toast.success("Welcome back, admin");
    } else {
      toast.error(error.message || "Invalid credentials");
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
            <h1 className="text-2xl font-extrabold tracking-tight">Admin {isResetMode ? "Recovery" : "Login"}</h1>
            <p className="text-sm text-muted-foreground">{isResetMode ? "Reset your password" : "Restricted access"}</p>
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
              placeholder="admin@example.com"
              className="mt-2"
              required
            />
          </div>
          {!isResetMode && (
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2"
                required
              />
            </div>
          )}
          <Button type="submit" disabled={loading} className="w-full gradient-primary text-primary-foreground shadow-elegant hover:opacity-90">
            {loading ? (isResetMode ? "Sending..." : "Signing in...") : (isResetMode ? "Send Reset Link" : "Sign in")}
          </Button>

          <div className="text-center mt-2">
            <Button
              type="button"
              variant="link"
              className="text-xs text-muted-foreground"
              onClick={() => setIsResetMode(!isResetMode)}
            >
              {isResetMode ? "Back to Login" : "Forgot Password?"}
            </Button>
          </div>
        </form>


      </div>
    </div>
  );
};

export default AdminLogin;
