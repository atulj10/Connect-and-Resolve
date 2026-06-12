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
import { FileText, Image as ImageIcon, Paperclip, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { applicationsApi } from "@/lib/api/applications";
import { getApiError } from "@/lib/api/client";
import { getStoredUser } from "@/lib/auth";
import districtBlocks from "@/assets/district_blocks.json";

export const APP_CATEGORIES = [
  "Application (आवेदन)",
  "Grievance (परिवाद)",
  "Complaint (शिकायत)",
  "Suggestion (सुझाव)",
  "Others (अन्य)",
] as const;

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_EXT = ["pdf", "jpg", "jpeg", "png"];
const ACCEPTED_MIME = "application/pdf,image/jpeg,image/jpg,image/png";

type Mode = "citizen" | "admin";

export function NewApplicationDialog({
  open,
  onOpenChange,
  mode,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  mode: Mode;
  onSuccess?: () => void;
}) {
  const user = getStoredUser();
  const [applicantName, setApplicantName] = useState(
    mode === "citizen" ? (user?.fullName ?? "") : "",
  );
  const [fatherName, setFatherName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState("");

  const [villageMohalla, setVillageMohalla] = useState("");
  const [panchayat, setPanchayat] = useState("");
  const [policeStation, setPoliceStation] = useState("");
  const [assemblyConstituency, setAssemblyConstituency] = useState("");
  const [block, setBlock] = useState("");
  const [district, setDistrict] = useState("");

  const districtOptions = districtBlocks.map((d) => d.district);
  const blockOptions = district
    ? (districtBlocks.find((d) => d.district === district)?.block ?? [])
    : [];

  const handleDistrictChange = (value: string) => {
    setDistrict(value);
    setBlock("");
  };
  const [pincode, setPincode] = useState("");

  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setApplicantName(mode === "citizen" ? (user?.fullName ?? "") : "");
    setFatherName("");
    setMobileNumber("");
    setSubject("");
    setCategory("");
    setDescription("");
    setVillageMohalla("");
    setPanchayat("");
    setPoliceStation("");
    setAssemblyConstituency("");
    setBlock("");
    setDistrict("");
    setPincode("");
    setFiles([]);
    setErrors({});
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
    if (!applicantName.trim()) errs.applicantName = "Applicant name is required";
    if (!fatherName.trim()) errs.fatherName = "Father's name is required";
    if (mode === "admin" && !/^\d{10}$/.test(mobileNumber.trim()))
      errs.mobileNumber = "Enter a valid 10-digit mobile number";
    if (!subject.trim() || subject.trim().length < 5)
      errs.subject = "Subject must be at least 5 characters";
    if (!category) errs.category = "Select a category";
    if (!villageMohalla.trim()) errs.villageMohalla = "Village/Mohalla is required";
    if (!block.trim()) errs.block = "Block is required";
    if (!district.trim()) errs.district = "District is required";
    if (pincode && !/^\d{6}$/.test(pincode)) errs.pincode = "Enter a valid 6-digit pincode";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async () => {
    if (!validate()) {
      toast.error("Please fix the highlighted fields");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        applicantName: applicantName.trim(),
        fatherName: fatherName.trim(),
        category,
        subject: subject.trim(),
        description: description.trim() || undefined,
        villageMohalla: villageMohalla.trim(),
        panchayat: panchayat.trim() || undefined,
        policeStation: policeStation.trim() || undefined,
        assemblyConstituency: assemblyConstituency.trim() || undefined,
        block: block.trim(),
        district: district.trim(),
        pincode: pincode || undefined,
      };
      const result =
        mode === "admin"
          ? await applicationsApi.createByAdmin({ ...payload, mobileNumber: mobileNumber.trim() })
          : await applicationsApi.create(payload);

      if (files.length > 0) {
        await Promise.all(files.map((f) => applicationsApi.uploadAttachment(result.id, f)));
      }

      const ref = result.referenceNumber || "";
      toast.success(
        mode === "citizen"
          ? "Application submitted successfully"
          : "Application created on behalf of citizen",
        {
          description: `Reference: ${ref}${files.length > 0 ? ` · ${files.length} file(s) attached` : ""}`,
        },
      );
      handleOpen(false);
      onSuccess?.();
    } catch (err: unknown) {
      toast.error(getApiError(err, "Failed to create application"));
    } finally {
      setSubmitting(false);
    }
  };

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

        <div className="space-y-6">
          <section>
            <SectionHeading>
              Personal Information {`(`}व्यक्तिगत जानकारी{`)`}
            </SectionHeading>
            <div className="mt-3 grid sm:grid-cols-2 gap-4">
              <Field label="Applicant Name (आवेदक का नाम )" error={errors.applicantName}>
                <Input
                  value={applicantName}
                  maxLength={80}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  readOnly={mode === "citizen"}
                  className={
                    mode === "citizen"
                      ? "bg-secondary/40 text-muted-foreground cursor-not-allowed"
                      : ""
                  }
                />
              </Field>
              <Field label="Father/Husband's (पिता/पति का नाम) Name" error={errors.fatherName}>
                <Input
                  value={fatherName}
                  maxLength={80}
                  onChange={(e) => setFatherName(e.target.value)}
                  placeholder="e.g. Rajesh Sharma"
                />
              </Field>
              {mode === "admin" && (
                <Field
                  label="Mobile/Whatsapp Number (मोइबाइल/ व्हाट्सएप नंबर)"
                  error={errors.mobileNumber}
                >
                  <Input
                    value={mobileNumber}
                    maxLength={10}
                    inputMode="numeric"
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                    placeholder="e.g. 9876543210"
                  />
                </Field>
              )}
            </div>
          </section>

          <Separator />

          <section>
            <SectionHeading>Address Information {`(पूरा पता)`}</SectionHeading>
            <div className="mt-3 grid sm:grid-cols-2 gap-4">
              <Field label="Village/Mohalla (गाँव/ मोहल्ला)" error={errors.villageMohalla}>
                <Input
                  value={villageMohalla}
                  maxLength={100}
                  onChange={(e) => setVillageMohalla(e.target.value)}
                  placeholder="e.g. Shiv Nagar"
                />
              </Field>
              <Field label="Panchayat (पंचायत)" error={errors.panchayat}>
                <Input
                  value={panchayat}
                  maxLength={100}
                  onChange={(e) => setPanchayat(e.target.value)}
                  placeholder="e.g. Gram Panchayat A"
                />
              </Field>
              <Field label="Police Station (थाना)" error={errors.policeStation}>
                <Input
                  value={policeStation}
                  maxLength={100}
                  onChange={(e) => setPoliceStation(e.target.value)}
                  placeholder="e.g. City Police Station"
                />
              </Field>

              <Field label="Pincode (पिनकोड)" error={errors.pincode}>
                <Input
                  value={pincode}
                  inputMode="numeric"
                  maxLength={6}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  placeholder="e.g. 400001"
                />
              </Field>
              <Field label="District (जिला)" error={errors.district}>
                <Select value={district} onValueChange={handleDistrictChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {districtOptions.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Block (प्रखंड)" error={errors.block}>
                <Select value={block} onValueChange={setBlock} disabled={!district}>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={district ? "Select block" : "Select district first"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {blockOptions.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Assembly Constituency (विधानसभा क्षेत्र)">
                <Input
                  value={assemblyConstituency}
                  maxLength={100}
                  onChange={(e) => setAssemblyConstituency(e.target.value)}
                  placeholder="e.g. Vidhan Sabha Constituency"
                />
              </Field>
            </div>
          </section>

          <Separator />

          <section>
            <SectionHeading>
              Details of Application {`(`}आवेदन से संबंधित जानकारी{`)`}
            </SectionHeading>

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Category (आवेदन का प्रकार)" error={errors.category}>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category (Not Confirmed)" />
                  </SelectTrigger>
                  <SelectContent>
                    {APP_CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <div className="mt-3 space-y-4">
              <Field label="Subject (विषय)" error={errors.subject}>
                <Input
                  value={subject}
                  maxLength={120}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject of Application"
                />
              </Field>

              <Field
                label="Description (विवरण)"
                error={errors.description}
                hint={`${description.length}/1000 characters`}
              >
                <Textarea
                  rows={5}
                  maxLength={1000}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide more information"
                />
              </Field>
            </div>
          </section>

          <Separator />

          <section>
            <SectionHeading>Attachments {`(संलग्नक)`}</SectionHeading>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-sm font-normal text-muted-foreground">
                  <Paperclip className="h-3.5 w-3.5" /> Optional supporting documents
                </Label>
                <span className="text-xs text-muted-foreground">
                  {files.length}/{MAX_FILES} files &bull; Max 5 MB each
                </span>
              </div>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
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
                  PDF, JPG, JPEG, PNG &bull; up to 5 MB per file
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  multiple
                  accept={ACCEPTED_MIME}
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) addFiles(e.target.files);
                    e.target.value = "";
                  }}
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
                          {isPdf ? (
                            <FileText className="h-4 w-4" />
                          ) : (
                            <ImageIcon className="h-4 w-4" />
                          )}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(i);
                          }}
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
          </section>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end pt-2">
          <Button variant="outline" onClick={() => handleOpen(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={submitting}>
            {submitting
              ? "Submitting..."
              : mode === "citizen"
                ? "Submit Application"
                : "Create Application"}
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
