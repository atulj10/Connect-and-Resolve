import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { D as Dialog, g as DialogContent, h as DialogHeader, i as DialogTitle, j as DialogDescription, k as Separator, C as CATEGORIES, B as Badge, m as STATUS_STYLES } from "./separator-CtzRYZjx.mjs";
import { B as Button, c as cn } from "./button-DjOZMqFS.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { L as Label } from "./label-C8WJLhmR.mjs";
import { e as Select, f as SelectTrigger, g as SelectValue, h as SelectContent, i as SelectItem } from "./select-JCJ1co2s.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { b as apiClient, a as getStoredUser, g as getApiError } from "./auth-tLLzOFk4.mjs";
import { l as Paperclip, y as Upload, F as FileText, I as Image, X } from "../_libs/lucide-react.mjs";
function StatusBadge({ status, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Badge,
    {
      variant: "outline",
      className: cn(
        "font-medium rounded-full px-2.5 py-0.5 text-xs whitespace-nowrap",
        STATUS_STYLES[status],
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current opacity-70" }),
        status
      ]
    }
  );
}
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
const applicationsApi = {
  create(data) {
    return apiClient.post("/applications", data).then((r) => r.data);
  },
  createByAdmin(data) {
    return apiClient.post("/applications/admin", data).then((r) => r.data);
  },
  list(params = {}) {
    return apiClient.get("/applications", { params }).then((r) => r.data);
  },
  getById(id) {
    return apiClient.get(`/applications/${id}`).then((r) => r.data);
  },
  updateStatus(id, status) {
    return apiClient.patch(`/applications/${id}/status`, { status }).then((r) => r.data);
  },
  updateDepartment(id, department) {
    return apiClient.patch(`/applications/${id}/department`, { department }).then((r) => r.data);
  },
  addRemarks(id, data) {
    return apiClient.patch(`/applications/${id}/remarks`, data).then((r) => r.data);
  },
  uploadAttachment(id, file) {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post(`/applications/${id}/attachments`, formData).then((r) => r.data);
  }
};
const districtBlocks = /* @__PURE__ */ JSON.parse('[{"district":"Patna","block":["Patna","Dhanarua","Phulwarisharif","Bihta","Naubatpur","Paliganj","Barh","Mokama","Masaurhi","Punpun","Maner","Danapur","Bikram","Bakhtiyarpur","Pandarak","Fatuha","Daniawan","Khusrupur","Athmalgola","Belchhi","Ghoswari","Dulhinbazar","Sampatchak"]},{"district":"Bhojpur","block":["Ara Sadar","Udwantnagar","Jagdishpur","Koilwar","Sahar","Barhara","Sandesh","Shahpur","Charpokhari","Piro","Tarari","Bihia","Agiawon","Garhani"]},{"district":"Buxar","block":["Buxar","Dumraon","Simari","Brahmpur","Rajpur","Itarhi","Nawanagar","Chaungain","Chausa","Chakki","Kesath"]},{"district":"Bhabhua","block":["Bhabhua","Ramgarh","Mohania","Durgawati","Adhaura","Bhagwanpur","Chand","Chainpur","Kudra","Rampur","Nuawon"]},{"district":"Rohtas","block":["Nauhatta","Chenari","Nasriganj","Rohtas","Shivsagar","Dawath","Karakat","Nokha.","Vikramganj","Kargahar","Sasaram","Dihri","Dinara","Kochas","Akorhigola","Rajpur","Tilauthu","Suryapura","Sanjhauli"]},{"district":"Nalanda","block":["Giriyak","Rahui","Nursarai","Harnaut","Chandi","Islampur","Rajgir","Asthawan","Sarmera","Hilsa","Biharsharif","Ekangarsarai","Ben","Nagarnausa","Karaiparsurai","Silao","Parwalpur","Katrisarai","Bind","Tharthari","Belaganj","Mohanpur","Konch","Barachatti","Manpur","Gurua","Tekari","Imamganj","Gaya Sadar","Wazirganj","Fatehpur","Paraiya","Sherghati","Bodh Gaya","Khizarsarai","Amas","Dumaria","Bankey Bazar","Dobhi","Tankuppa","Nimchakbathani","Guraru","Muhra"]},{"district":"Jehanabad","block":["Ghosi","Jehanabad","Makhdumpur","Kako","Ratnifridpur","Hulasganj","Modanganj"]},{"district":"Nawadah","block":["Kauakol","Varsaliganj","Nawadah","Rajouli","Akbarpur","Hisua","Narhat","Govindpur","Pakribarawan","Sirdalla","Kasichak","Roh","Nardiganj","Meskaur"]},{"district":"Aurangabad","block":["Madanpur","Kutumbba","Daudnagar","Aurangabad","Barun","Obra","Dev","Nabinagar","Haspura","Goh","Rafiganj"]},{"district":"Arwal","block":["Arwal","Kurtha","Karpi","Kaler","Sonebhadra Bansi Surjpur"]},{"district":"Muzaffarpur","block":["Sakra","Muraul","Musahari","Gayghat","Sahebganj","Kurahni","Saraiya","Minapur","Bochaha","Aurai","Katra","Kanti","Motipur","Paru","Bandra","Marawan"]},{"district":"Vaishali","block":["Mahnar","Vaishali","Bidupur","Goraul","Raghopur","Lalganj","Hazipur","Mahua","Jandaha","Patepur","Sahdeibuzurg","Razapakar","Bhagwanpur","Chehrakala","Patedhi-Belshar","Desari"]},{"district":"W.Champaran","block":["Bettiah","Sikta","Mainatand","Chanpattia","Bairia","Lauria","Bagaha - 1","Bagaha - 2","Madhubani","Gaunaha","Narkatiaganj","Manjhaulia","Nautan","Jogapatti","Ramnagar","Thakraha","Bhitaha","Piprasi"]},{"district":"E.Champaran","block":["Kesharia","Kalyanpur","Motihari","Sugauli","Harsiddhi","Pakridayal","Maheshi","Adapur","Chiraian","Paharpur","Raxaul","Turkaulia","Areraj","Ramgarhwa","Ghorasahan","Madhuban","Chakai","Patahi","Dhakha","Sangrampur","Phenhara","Tetaria","Vankatwa","Kotwa","Banjaria","Piprakothi","Chhauradano"]},{"district":"Sitamarhi","block":["Bathnaha","Parihar","Nanpur","Bazpatti","Bairgania","Belsand","Riga","Sursand","Pupri","Sonbarsa","Dumra","Runni saidpur","Majorganj","Suppi","Parsauni","Bokhra","Chorout"]},{"district":"Sheohar","block":["Sheohar","Tariyani","Piprahi","Dumrikatsari","Puranhia","Manjhi","Dighwara","Rivilganj","Parsa","Baniapur","Amnaur","Taraiya","Sonepur","Garkha","Ekma","Dariyapur","Jalalpur","Marhaura","Masarakh","Maker","Nagra","Panapur","Eisuapur","Lahladpur Jantabazar"]},{"district":"Siwan","block":["Pachrukhi","Raghunathpur","Mairwan","Aandar","Guthani","Maharajganj","Darauli","Siswan","Daraunda","Husainaganj","Bhagwanpur Hat","Goriyakothi","Baraharia","Siwan Sadar","Basantpur","Lakari Nabiganj","Jiradei","Nautan","Hasanpur"]},{"district":"Gopalganj","block":["Bhore","Gopalganj","Manjha","Uchakagaon","Kuchaikot","Kateya","Vijayeepur","Barauli","Hathua","Baikunthpur","Phulwaria","Thawe","Panchdevari","Sindhwalia"]},{"district":"Darbhanga","block":["Bahadurpur","Jale","Hayaghat","Singhwara","Benipur","Ghanshyampur","Baheri","Kewati","Manigachhi","Darbhanga","Biraul","Kusheswarsthan","Alinagar","Kusheswarsthan East","Gaura Vauram","Kiratpur","Tardih","HanumanNagar"]},{"district":"Madhubani","block":["Jainagar","Pandaul","Rahika","Bisfi","Benipatti","Basopatti","Babubarhi","Rajnagar","Madhepur","Khutauna","Khajauli","Jhanjharpur","Ghoghardiha","Ladania","Madhwapur","Harlakhi","Laukahi","Andharatharhi","Lakhnaur","Phulparas","Kaluahi"]},{"district":"Samastipur","block":["Jitwarpur","Kalyanpur","Warisnagar","Rosara","Tajpur Morwa","Patori","Sarairanjan","Pusa","Ujiyarpur","Dalsinghsarai","Singhia","Hasanpur","Mohiuddinnagar","Bibhutipur","Bithan","Tajpur","Shivajinagar","Vidyapatinagar","Khanpur","Mohanpur"]},{"district":"Munger","block":["Haveli kharagpur","Dharhara","Munger","Jamalpur","Tarapur","Sangrampur","Bariarpur","Tetiabamber","Asarganj"]},{"district":"Lakhisarai","block":["Halsi","Lakhisarai","Barahia","Suryagarha","Piparia","Raigarh Chowk","Chanan Banu Bagicha"]},{"district":"Sheikhpura","block":["Ariari","Sheikpura","Barbigha","Ghatkusumba","Chebara","Shekhopur Sarai"]},{"district":"Begusarai","block":["Bhagawanpur","Teghra","Bakhri","Begusarai","Barauni","Bachwara","Cheria Bariyarpur","Balia","Khodabandpur","Sahebpur Kamal","Matihani","Garhpura","Navkothi","Birpur","Mansurchak","Chhourahi","Dandari","Samho-Akaha-Kurha"]},{"district":"Jamui","block":["Jamui","Chakai","Laxmipur","Jhajha","Sono","Khaira","Sikandra","Barhat","Asalmanagar Aliganj","Gidhaur"]},{"district":"Khagaria","block":["Gogari","Parwatta","Khagaria","Alauli","Chautham","Beldaur","Mansi"]},{"district":"Bhagalpur","block":["Pirpainti","Kahalgoan","Sanhaula","Sabour","Nathnagar","Jagdishpur","Sultanganj","Sahkund","Bihpur","Navgachia","Gopalpur","Kharik","Narayanpur","Gauradih","Ismailpur","Rangrachowk"]},{"district":"Banka","block":["Banka","Rajon","Amarpur","Dhoraiya","Katoria","Bausi","Shambhuganj","Barahat","Belhar","Chandan","Phulidumar"]},{"district":"Saharsa","block":["Nauhatta","Simari bakhatiyarpur","Salkhua","Kahra","Mahishi","Sonbarsa","Saurbazar","Patarghat","Sattar Kateya","Banma Itahari"]},{"district":"Madhepura","block":["Madhepura","Sigheshwarsthan","Murliganj","Chausa","Kumarkhand","Alamnagar","Udakishanganj","Shankarpur","Gwalpara","Bihariganj","Puraini","Dhelarh","Gamharia"]},{"district":"Supaul","block":["Supaul","Triveniganj","Pipara","Marauna","Kishunpur","Raghopur","Nirmali","Basantpur","Chhatapur","Saraigarh Bhaptiyahi","Pratapganj"]},{"district":"Purnia","block":["Purnia","Amaur","Bhawanipur","Banmankhi","Dhamdaha","Baisa","Vaisi","Barharakothi"]},{"district":"Kishanganj","block":["Kishanganj","Kochadhaman","Bahadurganj","Terhagachhi","Dighalbank","Thakurganj","Pothia"]},{"district":"Katihar","block":["Katihar","Warsoi","Kadwa","Amdabad","Manihari","Balrampur","Korha","Falka","Alamnagar","Barari","Pranpur","Mansahi","Samaili","Kursaila","Hasanganj","Dandkhora"]},{"district":"Araria","block":["Araria","Raniganj","Bharganwan","Kursakata","Sikti","Narpatganj","Farbisganj","Palasi","Jokihat"]}]');
const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_EXT = ["pdf", "jpg", "jpeg", "png"];
const ACCEPTED_MIME = "application/pdf,image/jpeg,image/jpg,image/png";
function NewApplicationDialog({
  open,
  onOpenChange,
  mode,
  onSuccess
}) {
  const user = getStoredUser();
  const [applicantName, setApplicantName] = reactExports.useState(
    mode === "citizen" ? user?.fullName ?? "" : ""
  );
  const [fatherName, setFatherName] = reactExports.useState("");
  const [mobileNumber, setMobileNumber] = reactExports.useState("");
  const [subject, setSubject] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [villageMohalla, setVillageMohalla] = reactExports.useState("");
  const [panchayat, setPanchayat] = reactExports.useState("");
  const [policeStation, setPoliceStation] = reactExports.useState("");
  const [assemblyConstituency, setAssemblyConstituency] = reactExports.useState("");
  const [block, setBlock] = reactExports.useState("");
  const [district, setDistrict] = reactExports.useState("");
  const districtOptions = districtBlocks.map((d) => d.district);
  const blockOptions = district ? districtBlocks.find((d) => d.district === district)?.block ?? [] : [];
  const handleDistrictChange = (value) => {
    setDistrict(value);
    setBlock("");
  };
  const [pincode, setPincode] = reactExports.useState("");
  const [files, setFiles] = reactExports.useState([]);
  const [dragging, setDragging] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  const [submitting, setSubmitting] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const reset = () => {
    setApplicantName(mode === "citizen" ? user?.fullName ?? "" : "");
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
  const handleOpen = (v) => {
    if (!v) reset();
    onOpenChange(v);
  };
  const addFiles = reactExports.useCallback((incoming) => {
    const arr = Array.from(incoming);
    const accepted = [];
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
  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };
  const removeFile = (i) => setFiles((f) => f.filter((_, idx) => idx !== i));
  const validate = () => {
    const errs = {};
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
        description: description.trim() || void 0,
        villageMohalla: villageMohalla.trim(),
        panchayat: panchayat.trim() || void 0,
        policeStation: policeStation.trim() || void 0,
        assemblyConstituency: assemblyConstituency.trim() || void 0,
        block: block.trim(),
        district: district.trim(),
        pincode: pincode || void 0
      };
      const result = mode === "admin" ? await applicationsApi.createByAdmin({ ...payload, mobileNumber: mobileNumber.trim() }) : await applicationsApi.create(payload);
      if (files.length > 0) {
        await Promise.all(files.map((f) => applicationsApi.uploadAttachment(result.id, f)));
      }
      const ref = result.referenceNumber || "";
      toast.success(
        mode === "citizen" ? "Application submitted successfully" : "Application created on behalf of citizen",
        {
          description: `Reference: ${ref}${files.length > 0 ? ` · ${files.length} file(s) attached` : ""}`
        }
      );
      handleOpen(false);
      onSuccess?.();
    } catch (err) {
      toast.error(getApiError(err, "Failed to create application"));
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: handleOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl max-h-[92vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl", children: mode === "citizen" ? "New Application" : "Create Application" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: mode === "citizen" ? "File a new complaint, grievance, suggestion or request." : "Register an application on behalf of a citizen." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionHeading, { children: [
          "Personal Information ",
          `(`,
          "व्यक्तिगत जानकारी",
          `)`
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Applicant Name (आवेदक का नाम )", error: errors.applicantName, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: applicantName,
              maxLength: 80,
              onChange: (e) => setApplicantName(e.target.value),
              placeholder: "e.g. Aarav Sharma",
              readOnly: mode === "citizen",
              className: mode === "citizen" ? "bg-secondary/40 text-muted-foreground cursor-not-allowed" : ""
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Father/Husband's (पिता/पति का नाम) Name", error: errors.fatherName, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: fatherName,
              maxLength: 80,
              onChange: (e) => setFatherName(e.target.value),
              placeholder: "e.g. Rajesh Sharma"
            }
          ) }),
          mode === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Field,
            {
              label: "Mobile/Whatsapp Number (मोइबाइल/ व्हाट्सएप नंबर)",
              error: errors.mobileNumber,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  value: mobileNumber,
                  maxLength: 10,
                  inputMode: "numeric",
                  onChange: (e) => setMobileNumber(e.target.value.replace(/\D/g, "")),
                  placeholder: "e.g. 9876543210"
                }
              )
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionHeading, { children: [
          "Address Information ",
          `(पूरा पता)`
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Village/Mohalla (गाँव/ मोहल्ला)", error: errors.villageMohalla, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: villageMohalla,
              maxLength: 100,
              onChange: (e) => setVillageMohalla(e.target.value),
              placeholder: "e.g. Shiv Nagar"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Panchayat (पंचायत)", error: errors.panchayat, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: panchayat,
              maxLength: 100,
              onChange: (e) => setPanchayat(e.target.value),
              placeholder: "e.g. Gram Panchayat A"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Police Station (थाना)", error: errors.policeStation, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: policeStation,
              maxLength: 100,
              onChange: (e) => setPoliceStation(e.target.value),
              placeholder: "e.g. City Police Station"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Pincode (पिनकोड)", error: errors.pincode, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: pincode,
              inputMode: "numeric",
              maxLength: 6,
              onChange: (e) => setPincode(e.target.value.replace(/\D/g, "")),
              placeholder: "e.g. 400001"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "District (जिला)", error: errors.district, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: district, onValueChange: handleDistrictChange, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select district" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: districtOptions.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: d }, d)) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Block (प्रखंड)", error: errors.block, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: block, onValueChange: setBlock, disabled: !district, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              SelectValue,
              {
                placeholder: district ? "Select block" : "Select district first"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: blockOptions.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: b, children: b }, b)) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Assembly Constituency (विधानसभा क्षेत्र)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: assemblyConstituency,
              maxLength: 100,
              onChange: (e) => setAssemblyConstituency(e.target.value),
              placeholder: "e.g. Vidhan Sabha Constituency"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionHeading, { children: [
          "Details of Application ",
          `(`,
          "आवेदन से संबंधित जानकारी",
          `)`
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Category (आवेदन का प्रकार)", error: errors.category, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: category, onValueChange: setCategory, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select category (Not Confirmed)" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Subject (विषय)", error: errors.subject, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value: subject,
              maxLength: 120,
              onChange: (e) => setSubject(e.target.value),
              placeholder: "Subject of Application"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Field,
            {
              label: "Description (विवरण)",
              error: errors.description,
              hint: `${description.length}/1000 characters`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  rows: 5,
                  maxLength: 1e3,
                  value: description,
                  onChange: (e) => setDescription(e.target.value),
                  placeholder: "Provide more information"
                }
              )
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionHeading, { children: [
          "Attachments ",
          `(संलग्नक)`
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-2 text-sm font-normal text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "h-3.5 w-3.5" }),
              " Optional supporting documents"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              files.length,
              "/",
              MAX_FILES,
              " files • Max 5 MB each"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              onDragOver: (e) => {
                e.preventDefault();
                setDragging(true);
              },
              onDragLeave: () => setDragging(false),
              onDrop,
              onClick: () => inputRef.current?.click(),
              role: "button",
              tabIndex: 0,
              className: `group cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-colors ${dragging ? "border-primary bg-primary/5" : "border-border bg-secondary/30 hover:bg-secondary/50 hover:border-primary/50"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-11 w-11 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-5 w-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium", children: [
                  "Drop files here or ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "browse" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "PDF, JPG, JPEG, PNG • up to 5 MB per file" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: inputRef,
                    type: "file",
                    multiple: true,
                    accept: ACCEPTED_MIME,
                    className: "hidden",
                    onChange: (e) => {
                      if (e.target.files) addFiles(e.target.files);
                      e.target.value = "";
                    }
                  }
                )
              ]
            }
          ),
          files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 pt-1", children: files.map((f, i) => {
            const isPdf = f.name.toLowerCase().endsWith(".pdf");
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-center gap-3 rounded-lg border border-border bg-card p-2.5",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0", children: isPdf ? /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium truncate", children: f.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      (f.size / 1024 / 1024).toFixed(2),
                      " MB"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "ghost",
                      size: "icon",
                      className: "h-8 w-8 text-muted-foreground hover:text-destructive",
                      onClick: (e) => {
                        e.stopPropagation();
                        removeFile(i);
                      },
                      "aria-label": "Remove file",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                    }
                  )
                ]
              },
              `${f.name}-${i}`
            );
          }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse sm:flex-row gap-2 sm:justify-end pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => handleOpen(false), disabled: submitting, children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: submit, disabled: submitting, children: submitting ? "Submitting..." : mode === "citizen" ? "Submit Application" : "Create Application" })
    ] })
  ] }) });
}
function SectionHeading({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground/90 uppercase tracking-wider", children });
}
function Field({
  label,
  error,
  hint,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: label }),
    children,
    error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: error }) : hint ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: hint }) : null
  ] });
}
export {
  NewApplicationDialog as N,
  StatusBadge as S,
  Textarea as T,
  applicationsApi as a
};
