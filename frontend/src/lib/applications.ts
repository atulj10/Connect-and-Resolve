export type AppStatus = "Submitted" | "In Process" | "Resolved" | "Rejected";

export const STATUSES: AppStatus[] = ["Submitted", "In Process", "Resolved", "Rejected"];

export const CATEGORIES = [
  "Grievance (परिवाद)",
  "Suggestion (सुझाव)",
  "Transfer Posting (स्थानांतरण)",
  "Complaint Against Officer (अधिकारी के विरुद्ध शिकायत आवेदन)",
  "Complaint Against Representative (प्रतिनिधि के विरुद्ध शिकायत आवेदन)",
  "General Application (सामान्य आवेदन)",
  "VIP Application (विशेष आवेदन)",
  "New Construction Work Demand (नए निर्माण कार्य हेतु आवेदन)",
  "Others (अन्य)",
] as const;

export const DEPARTMENTS = [
  "Cabinet Secretariat Department",
  "General Administration Department",
  "Home Department",
  "Law Department",
  "Disaster Management Department",
  "Information & Public Relations Department",
  "Parliamentary Affairs Department",
  "Planning & Development Department",
  "Vigilance Department",
  "Office of the Chief Electoral Officer",
  "Finance & Revenue Departments",
  "Finance Department",
  "Commercial Taxes Department",
  "Revenue & Land Reforms Department",
  "Mines & Geology Department",
  "Prohibition, Excise & Registration Department",
  "Transport Department",
  "Education, Health & Human Resources",
  "Education Department",
  "Higher Education Department",
  "Health Department",
  "Science, Technology & Technical Education Department",
  "Youth, Employment & Skill Development Department",
  "Infrastructure & Industrial Development",
  "Building Construction Department",
  "Industries Department",
  "Energy Department",
  "Information Technology Department",
  "Civil Aviation Department",
  "Public Health Engineering Department (PHED)",
  "Road Construction Department",
  "Rural Works Department",
  "Urban Development & Housing Department",
  "Agriculture & Rural Development",
  "Agriculture Department",
  "Animal & Fisheries Resources Department",
  "Cooperative Department",
  "Environment, Forest & Climate Change Department",
  "Food & Consumer Protection Department",
  "Minor Water Resources Department",
  "Panchayati Raj Department",
  "Rural Development Department",
  "Sugarcane Industries Department",
  "Water Resources Department",
  "Social Welfare Departments",
  "Social Welfare Department",
  "Backward Classes & Extremely Backward Classes Welfare Department",
  "Scheduled Castes & Scheduled Tribes Welfare Department",
  "Minority Welfare Department",
  "Labour Resources & Migrant Workers Welfare Department",
  "Tourism, Culture & Sports",
  "Tourism Department",
  "Art, Culture & Youth Department",
  "Sports Department",
  "Other offices / ULBs / Commission / Authority etc",
] as const;

export const DISTRICTS = ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad"];

export type Application = {
  refNo: string;
  subject: string;
  category: (typeof CATEGORIES)[number];
  department: (typeof DEPARTMENTS)[number];
  status: AppStatus;
  createdAt: string;
  updatedAt: string;
  assignedAt: string;
  applicantName: string;
  fatherName: string;
  mobile: string;
  villageMohalla: string;
  panchayat: string;
  policeStation: string;
  block: string;
  district: string;
  pincode: string;
  description?: string;
  remarks: string;
  internalNotes: string;
  attachments: string[];
};

const subjects = [
  "Broken streetlight on MG Road",
  "Irregular water supply in sector 12",
  "Pothole repair request near school",
  "Garbage collection delayed for 5 days",
  "Voltage fluctuation in residential area",
  "Request for public toilet construction",
  "Stray dog menace in colony",
  "School building leakage during rains",
  "Hospital staff shortage complaint",
  "Property tax assessment correction",
  "Bus stop shelter damaged",
  "Drainage overflow on main street",
  "Park maintenance suggestion",
  "Traffic signal not working",
  "Anganwadi center repair needed",
];

const names = [
  "Aarav Sharma",
  "Priya Patel",
  "Rohan Mehta",
  "Ananya Singh",
  "Vikram Reddy",
  "Sneha Iyer",
  "Karan Joshi",
  "Meera Nair",
  "Arjun Verma",
  "Divya Gupta",
  "Rahul Kulkarni",
  "Pooja Desai",
];

function seeded(i: number) {
  let s = i * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

const fatherNames = [
  "Rajesh Sharma",
  "Sunil Patel",
  "Mahesh Mehta",
  "Ramesh Singh",
  "Suresh Reddy",
  "Dinesh Iyer",
  "Ganesh Joshi",
  "Kishore Nair",
  "Lalit Verma",
  "Prakash Gupta",
  "Vinod Kulkarni",
  "Sanjay Desai",
];

const villages = ["Shiv Nagar", "Gandhi Colony", "Indira Vihar", "Netaji Chowk", "Ambedkar Basti"];
const panchayats = ["Gram Panchayat A", "Gram Panchayat B", "Gram Panchayat C", "Gram Panchayat D"];
const policeStations = [
  "City Police Station",
  "Sadar Police Station",
  "Rural Police Station",
  "Model Police Station",
];
const blocks = ["Block 1", "Block 2", "Block 3", "Block 4", "Block 5"];

export function generateApplications(count = 48): Application[] {
  const r = seeded(42);
  return Array.from({ length: count }, (_, i) => {
    const created = Math.floor(r() * 90);
    const updated = Math.max(0, created - Math.floor(r() * 20));
    const assigned = Math.max(0, created - Math.floor(r() * 5));
    const category = CATEGORIES[Math.floor(r() * CATEGORIES.length)];
    const department = DEPARTMENTS[Math.floor(r() * DEPARTMENTS.length)];
    const status = STATUSES[Math.floor(r() * STATUSES.length)];
    const subject = subjects[Math.floor(r() * subjects.length)];
    const name = names[Math.floor(r() * names.length)];
    const father = fatherNames[Math.floor(r() * fatherNames.length)];
    const district = DISTRICTS[Math.floor(r() * DISTRICTS.length)];
    return {
      refNo: `CCG-2026-${String(10000 + i).padStart(5, "0")}`,
      subject,
      category,
      department,
      status,
      createdAt: daysAgo(created),
      updatedAt: daysAgo(updated),
      assignedAt: daysAgo(assigned),
      applicantName: name,
      fatherName: father,
      mobile: `98${Math.floor(10000000 + r() * 89999999)}`,
      villageMohalla: villages[Math.floor(r() * villages.length)],
      panchayat: panchayats[Math.floor(r() * panchayats.length)],
      policeStation: policeStations[Math.floor(r() * policeStations.length)],
      block: blocks[Math.floor(r() * blocks.length)],
      district,
      pincode: `${400000 + Math.floor(r() * 100000)}`,
      description:
        Math.random() > 0.3
          ? "Detailed description of the issue reported by the citizen, including location, time of occurrence, and impact on the community."
          : undefined,
      remarks:
        status === "Resolved"
          ? "Issue has been addressed by the concerned department. Follow-up inspection scheduled."
          : status === "Rejected"
            ? "Application has been reviewed and rejected due to insufficient information."
            : "Pending review from concerned department.",
      internalNotes: "Verified with field officer. Awaiting departmental confirmation.",
      attachments: ["complaint_photo.jpg", "site_report.pdf"],
    };
  });
}

export const STATUS_STYLES: Record<AppStatus, string> = {
  Submitted: "bg-blue-50 text-blue-700 border-blue-200",
  "In Process": "bg-indigo-50 text-indigo-700 border-indigo-200",
  Resolved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rejected: "bg-red-50 text-red-700 border-red-200",
};

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
