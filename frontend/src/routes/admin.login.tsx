import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff, Landmark, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import adminIllustration from "@/assets/admin-illustration.png";
import { authApi } from "@/lib/api/auth";
import { getApiError } from "@/lib/api/client";
import { setStoredUser } from "@/lib/auth";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login — Minister Office Dashboard" },
      {
        name: "description",
        content:
          "Secure administrative login for Minister Office personnel managing citizen grievances.",
      },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return toast.error("Enter a valid email address");
    if (password.length < 8) return toast.error("Password must be at least 8 characters");
    setLoading(true);
    try {
      const result = await authApi.adminLogin(email, password);
      setStoredUser(result.user, result.token);
      toast.success("Welcome back, Administrator");
      navigate({ to: "/admin/dashboard" });
    } catch (err: unknown) {
      toast.error(getApiError(err, "Invalid credentials"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid min-h-screen lg:grid-cols-2"
      >
        <div className="flex flex-col px-6 py-10 sm:px-12 lg:px-16 order-2 lg:order-1">
          <Link to="/" className="flex items-center gap-2.5 w-fit">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Landmark className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold leading-tight">Citizen Connect</span>
              <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                Minister Office
              </span>
            </div>
          </Link>

          <div className="mx-auto w-full max-w-md flex-1 flex flex-col justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 w-fit"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>

            <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium">
              <Lock className="h-3 w-3 text-primary" /> Restricted Access
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight">Administrator Login</h1>
            <p className="mt-2 text-muted-foreground">
              Sign in to the Minister Office Dashboard to manage citizen applications.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-elevated sm:p-8"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email Address</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    autoComplete="username"
                    placeholder="admin@gov.in"
                    maxLength={255}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="admin-password">Password</Label>
                    <button
                      type="button"
                      className="text-xs font-medium text-primary hover:underline"
                      onClick={() => toast.info("Reset link sent to your registered email")}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      id="admin-password"
                      type={show ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      maxLength={128}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShow((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      aria-label={show ? "Hide password" : "Show password"}
                    >
                      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <Button type="submit" size="lg" className="mt-6 w-full" disabled={loading}>
                {loading ? "Logging in..." : "Login to Dashboard"}
              </Button>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> All sessions are monitored and
                audited.
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Are you a citizen?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Go to citizen login
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden lg:flex flex-col justify-between gradient-primary-soft p-12 order-1 lg:order-2">
          <div className="ml-auto inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-primary" /> Government Portal
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src={adminIllustration}
              alt=""
              width={1024}
              height={1024}
              loading="lazy"
              className="w-full max-w-md"
            />
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
              Minister Office Dashboard
            </h2>
            <p className="mt-2 max-w-sm text-muted-foreground">
              Review grievances, coordinate with departments, and drive faster resolutions for your
              constituents.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { v: "256-bit", l: "Encryption" },
              { v: "2FA", l: "Available" },
              { v: "ISO 27001", l: "Compliant" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-xl border border-border bg-background/60 p-3 backdrop-blur"
              >
                <div className="text-sm font-bold text-foreground">{s.v}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
