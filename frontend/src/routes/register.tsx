import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, BadgeCheck, Landmark, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account — Citizen Connect" },
      { name: "description", content: "Register on Citizen Connect to submit grievances, track applications and engage with your government." },
    ],
  }),
  component: RegisterPage,
});

const STATES = [
  "Andhra Pradesh", "Bihar", "Delhi", "Gujarat", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Rajasthan",
  "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal",
];

const DISTRICTS: Record<string, string[]> = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
  Karnataka: ["Bengaluru Urban", "Mysuru", "Mangaluru", "Hubballi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
  Delhi: ["New Delhi", "North Delhi", "South Delhi", "East Delhi"],
};

function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    state: "",
    district: "",
  });
  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [mobileOtp, setMobileOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v, ...(k === "state" ? { district: "" } : {}) }));

  const sendMobileOtp = () => {
    if (!/^\d{10}$/.test(form.mobile)) return toast.error("Enter a valid 10-digit mobile number");
    setMobileOtpSent(true);
    setMobileOtp("");
    toast.success("OTP sent to your mobile");
  };

  const confirmMobileOtp = () => {
    if (mobileOtp.length !== 6) return toast.error("Enter the 6-digit mobile OTP");
    setMobileVerified(true);
    setMobileOtpSent(false);
    toast.success("Mobile verified successfully");
  };

  const sendEmailOtp = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return toast.error("Enter a valid email address");
    setEmailOtpSent(true);
    setEmailOtp("");
    toast.success("OTP sent to your email");
  };

  const confirmEmailOtp = () => {
    if (emailOtp.length !== 6) return toast.error("Enter the 6-digit email OTP");
    setEmailVerified(true);
    setEmailOtpSent(false);
    toast.success("Email verified successfully");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName.trim()) return toast.error("Full name is required");
    if (!form.mobile && !form.email) return toast.error("Provide at least Mobile or Email");
    if (form.mobile && !mobileVerified) return toast.error("Please verify your mobile number");
    if (form.email && !emailVerified) return toast.error("Please verify your email address");
    if (!form.state || !form.district) return toast.error("Select your state and district");
    toast.success("Account created successfully!");
  };

  const districts = DISTRICTS[form.state] ?? ["District 1", "District 2", "District 3"];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-10 sm:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Landmark className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">Citizen Connect</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
        </div>

        <div className="mt-10">
          <h1 className="text-3xl font-bold tracking-tight">Create your citizen account</h1>
          <p className="mt-2 text-muted-foreground">
            Register to submit applications, track grievances, and stay connected with your representatives.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="fullName">Full Name <span className="text-destructive">*</span></Label>
              <Input
                id="fullName"
                placeholder="Aarav Sharma"
                maxLength={100}
                value={form.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="mobile">Mobile Number</Label>
                {mobileVerified && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                    <BadgeCheck className="h-3.5 w-3.5" /> Verified
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  id="mobile"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="98765 43210"
                  value={form.mobile}
                  onChange={(e) => {
                    set("mobile", e.target.value.replace(/\D/g, ""));
                    setMobileVerified(false);
                    setMobileOtpSent(false);
                  }}
                  disabled={mobileVerified || mobileOtpSent}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={sendMobileOtp}
                  disabled={mobileVerified || !form.mobile}
                >
                  {mobileOtpSent ? "Resend" : "Send OTP"}
                </Button>
              </div>
              {mobileOtpSent && !mobileVerified && (
                <div className="mt-3 rounded-lg border border-border bg-secondary/40 p-3 space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Enter the 6-digit code sent to +91 {form.mobile}
                  </p>
                  <InputOTP maxLength={6} value={mobileOtp} onChange={setMobileOtp}>
                    <InputOTPGroup>
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                  <Button type="button" size="sm" onClick={confirmMobileOtp} className="w-full">
                    Verify Mobile OTP
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="email">Email Address</Label>
                {emailVerified && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                    <BadgeCheck className="h-3.5 w-3.5" /> Verified
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  maxLength={255}
                  value={form.email}
                  onChange={(e) => {
                    set("email", e.target.value);
                    setEmailVerified(false);
                    setEmailOtpSent(false);
                  }}
                  disabled={emailVerified || emailOtpSent}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={sendEmailOtp}
                  disabled={emailVerified || !form.email}
                >
                  {emailOtpSent ? "Resend" : "Send OTP"}
                </Button>
              </div>
              {emailOtpSent && !emailVerified && (
                <div className="mt-3 rounded-lg border border-border bg-secondary/40 p-3 space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Enter the 6-digit code sent to {form.email}
                  </p>
                  <InputOTP maxLength={6} value={emailOtp} onChange={setEmailOtp}>
                    <InputOTPGroup>
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                  <Button type="button" size="sm" onClick={confirmEmailOtp} className="w-full">
                    Verify Email OTP
                  </Button>
                </div>
              )}
            </div>

            <p className="-mt-2 text-xs text-muted-foreground sm:col-span-2">
              At least one of Mobile or Email is required and must be verified.
            </p>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address">Address <span className="text-muted-foreground font-normal">(Optional)</span></Label>
              <Textarea
                id="address"
                placeholder="House no, Street, Locality"
                maxLength={500}
                rows={3}
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>State <span className="text-destructive">*</span></Label>
              <Select value={form.state} onValueChange={(v) => set("state", v)}>
                <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                <SelectContent>
                  {STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>District <span className="text-destructive">*</span></Label>
              <Select value={form.district} onValueChange={(v) => set("district", v)} disabled={!form.state}>
                <SelectTrigger><SelectValue placeholder={form.state ? "Select district" : "Select state first"} /></SelectTrigger>
                <SelectContent>
                  {districts.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" size="lg" className="mt-8 w-full">
            Create Account
          </Button>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Your data is protected under the Digital Personal Data Protection Act.
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
