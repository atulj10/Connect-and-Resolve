import { useCallback, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Image as ImageIcon, Paperclip, Upload, X, MapPin } from "lucide-react";
import { toast } from "sonner";

export const APP_CATEGORIES = [
  "Complaint Registration",
  "Public Grievance",
  "Suggestions & Ideas",
  "Requests for Assistance",
  "Public Representation",
  "Event/Meeting Requests",
] as const;

export const STATE_DISTRICTS: Record<string, string[]> = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
  Delhi: ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Noida"],
};

const STATES = Object.keys(STATE_DISTRICTS);

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_EXT = ["pdf", "jpg", "jpeg", "png"];
const ACCEPTED_MIME = "application/pdf,image/jpeg,image/jpg,image/png";

type Mode = "citizen" | "admin";

export function NewApplicationDialog({
  open,
  onOpenChange,
  mode,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  mode: Mode;
}) {
  // Citizen fields (admin only)
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // Application fields
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [location, setLocation] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setFullName(""); setMobile(""); setEmail(""); setAddress("");
    setSubject(""); setCategory(""); setDescription("");
    setState(""); setDistrict(""); setLocation("");
    setFiles([]); setErrors({});
  };

  const handleOpen = (v: boolean) => {
    if (!v) reset();
    onOpenChange(v);
  };

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const arr = Array.from(incoming);
    const accepted: File[] = [];
    for (const f of arr) {
      const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
      if (!ACCEPTED_EXT.includes(ext)) {
        toast.error(`"${f.name}" — only PDF, JPG, JPEG, PNG allowed`);
        continue;
      }
      if (f.size > MAX_FILE_SIZE) {
        toast.error(`"${f.name}" exceeds 5 MB limit`);
        continue;
      }
      accepted.push(f);
    }
    setFiles((prev) => {
      const space = MAX_FILES - prev.length;
      if (space <= 0) {
        toast.error(`Maximum ${MAX_FILES} files allowed`);
        return prev;
      }
      const next = accepted.slice(0, space);
      if (accepted.length > space) toast.error(`Only ${space} more file(s) can be added`);
      return [...prev, ...next];
    });
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  const removeFile = (i: number) => setFiles((f) => f.filter((_, idx) => idx !== i));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (mode === "admin") {
      if (!fullName.trim()) errs.fullName = "Full name is required";
      if (!/^\d{10}$/.test(mobile)) errs.mobile = "Enter a valid 10-digit mobile number";
      if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "Enter a valid email";
      if (!address.trim()) errs.address = "Address is required";
    }
    if (!subject.trim() || subject.trim().length < 5) errs.subject = "Subject must be at least 5 characters";
    if (!category) errs.category = "Select a category";
    if (!description.trim() || description.trim().length < 20) errs.description = "Description must be at least 20 characters";
    if (!state) errs.state = "Select a state";
    if (!district) errs.district = "Select a district";
    if (!location.trim()) errs.location = "Location is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = () => {
    if (!validate()) {
      toast.error("Please fix the highlighted fields");
      return;
    }
    toast.success(
      mode === "citizen"
        ? "Application submitted successfully"
        : "Application created on behalf of citizen",
      { description: `Reference: CCG-2026-${Math.floor(10000 + Math.random() * 89999)}` },
    );
    handleOpen(false);
  };

  const districts = state ? STATE_DISTRICTS[state] : [];

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {mode === "citizen" ? "New Application" : "Create Application"}
          </DialogTitle>
          <DialogDescription>
            {mode === "citizen"
              ? "File a new complaint, grievance, suggestion or request."
              : "Register an application on behalf of a citizen."}
          </DialogDescription>
        </DialogHeader>

        {mode === "admin" && (
          <>
            <SectionHeading>Citizen Information</SectionHeading>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name" error={errors.fullName}>
                <Input
                  value={fullName}
                  maxLength={80}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                />
              </Field>
              <Field label="Mobile Number" error={errors.mobile}>
                <Input
                  inputMode="numeric"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                  placeholder="10-digit mobile"
                />
              </Field>
              <Field label="Email Address" error={errors.email}>
                <Input
                  type="email"
                  value={email}
                  maxLength={120}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="citizen@example.com"
                />
              </Field>
              <Field label="Address" error={errors.address}>
                <Input
                  value={address}
                  maxLength={200}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House no., street, area"
                />
              </Field>
            </div>
            <Separator className="my-2" />
          </>
        )}

        <SectionHeading>Application Details</SectionHeading>
        <div className="grid gap-4">
          <Field label="Subject" error={errors.subject}>
            <Input
              value={subject}
              maxLength={120}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief title of the issue"
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Category" error={errors.category}>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {APP_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field
              label="Location"
              error={errors.location}
              hint="Landmark, area or pincode"
            >
              <div className="relative">
                <MapPin className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9"
                  value={location}
                  maxLength={150}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Near City Hospital, MG Road"
                />
              </div>
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="State" error={errors.state}>
              <Select value={state} onValueChange={(v) => { setState(v); setDistrict(""); }}>
                <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                <SelectContent>
                  {STATES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="District" error={errors.district}>
              <Select value={district} onValueChange={setDistrict} disabled={!state}>
                <SelectTrigger>
                  <SelectValue placeholder={state ? "Select district" : "Select state first"} />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field label="Description" error={errors.description} hint={`${description.length}/1000 characters`}>
            <Textarea
              rows={5}
              maxLength={1000}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the issue in detail — when, where, who is affected..."
            />
          </Field>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Paperclip className="h-3.5 w-3.5" /> Attachments
              </Label>
              <span className="text-xs text-muted-foreground">
                {files.length}/{MAX_FILES} files • Max 5 MB each
              </span>
            </div>

            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              role="button"
              tabIndex={0}
              className={`group cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
                dragging
                  ? "border-primary bg-primary/5"
                  : "border-border bg-secondary/30 hover:bg-secondary/50 hover:border-primary/50"
              }`}
            >
              <div className="mx-auto h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Upload className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium">
                Drop files here or <span className="text-primary">browse</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PDF, JPG, JPEG, PNG • up to 5 MB per file
              </p>
              <input
                ref={inputRef}
                type="file"
                multiple
                accept={ACCEPTED_MIME}
                className="hidden"
                onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ""; }}
              />
            </div>

            {files.length > 0 && (
              <ul className="space-y-2 pt-1">
                {files.map((f, i) => {
                  const isPdf = f.name.toLowerCase().endsWith(".pdf");
                  return (
                    <li
                      key={`${f.name}-${i}`}
                      className="flex items-center gap-3 rounded-lg border border-border bg-card p-2.5"
                    >
                      <div className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        {isPdf ? <FileText className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{f.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(f.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                        aria-label="Remove file"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end pt-2">
          <Button variant="outline" onClick={() => handleOpen(false)}>Cancel</Button>
          <Button onClick={submit}>
            {mode === "citizen" ? "Submit Application" : "Create Application"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-foreground/90 uppercase tracking-wider">
      {children}
    </h3>
  );
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      {children}
      {error ? (
        <p className="text-xs text-destructive">{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
