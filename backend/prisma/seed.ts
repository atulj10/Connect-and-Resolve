import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const CATEGORIES = [
  "Water Supply", "Electricity", "Roads & Infrastructure",
  "Sanitation", "Healthcare", "Education", "Public Safety", "Revenue",
] as const;

const DEPARTMENTS = [
  "Public Works", "Water Resources", "Electricity Board",
  "Municipal Corporation", "Health Department", "Education Department",
  "Police Department", "Revenue Department",
] as const;

const STATUSES = [
  "Submitted", "Under Review", "Forwarded to Department",
  "In Process", "Action Taken", "Resolved", "Closed",
] as const;

const DISTRICTS = ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad"];
const VILLAGES = ["Shiv Nagar", "Gandhi Colony", "Indira Vihar", "Netaji Chowk", "Ambedkar Basti"];
const PANCHAYATS = ["Gram Panchayat A", "Gram Panchayat B", "Gram Panchayat C", "Gram Panchayat D"];
const POLICE_STATIONS = ["City PS", "Sadar PS", "Rural PS", "Model PS"];
const BLOCKS = ["Block 1", "Block 2", "Block 3", "Block 4", "Block 5"];

const CITIZENS = [
  { fullName: "Aarav Sharma", mobile: "9876543210", email: "aarav.sharma@mail.com" },
  { fullName: "Priya Patel", mobile: "9876543211", email: "priya.patel@mail.com" },
  { fullName: "Rohan Mehta", mobile: "9876543212", email: "rohan.mehta@mail.com" },
  { fullName: "Ananya Singh", mobile: "9876543213", email: "ananya.singh@mail.com" },
  { fullName: "Vikram Reddy", mobile: "9876543214", email: "vikram.reddy@mail.com" },
  { fullName: "Sneha Iyer", mobile: "9876543215", email: "sneha.iyer@mail.com" },
];

const SUBJECTS = [
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
  return d;
}

async function main() {
  // Clean existing data
  await prisma.auditLog.deleteMany();
  await prisma.applicationStatusHistory.deleteMany();
  await prisma.attachment.deleteMany();
  await prisma.application.deleteMany();
  await prisma.otp.deleteMany();
  await prisma.referenceCounter.deleteMany();
  await prisma.user.deleteMany();

  // Create admin
  const adminPassword = await bcrypt.hash("admin@123", 10);
  const admin = await prisma.user.create({
    data: {
      fullName: "Rajeev Menon",
      mobileNumber: "9999999999",
      email: "rajeev.menon@minister.gov.in",
      role: "ADMIN",
      password: adminPassword,
      mobileVerified: true,
      emailVerified: true,
    },
  });
  console.log(`✅ Admin created: ${admin.email} / admin@123`);

  // Create citizens
  const citizens = await Promise.all(
    CITIZENS.map((c) =>
      prisma.user.create({
        data: {
          fullName: c.fullName,
          mobileNumber: c.mobile,
          email: c.email,
          role: "CITIZEN",
          mobileVerified: true,
          emailVerified: true,
        },
      }),
    ),
  );
  console.log(`✅ ${citizens.length} citizens created`);

  // Create applications
  const r = seeded(42);
  let appCount = 0;
  for (let year = 2025; year <= 2026; year++) {
    const yearPrefix = `MIN/${year}/`;
    let counter = 0;
    for (let i = 0; i < 24; i++) {
      const citizen = citizens[Math.floor(r() * citizens.length)];
      counter++;
      const refNo = `${yearPrefix}${String(counter).padStart(8, "0")}`;
      const created = daysAgo(Math.floor(r() * 365));
      const category = CATEGORIES[Math.floor(r() * CATEGORIES.length)];
      const department = DEPARTMENTS[Math.floor(r() * DEPARTMENTS.length)];
      const status = STATUSES[Math.floor(r() * STATUSES.length)];
      const district = DISTRICTS[Math.floor(r() * DISTRICTS.length)];

      await prisma.application.create({
        data: {
          referenceNumber: refNo,
          applicationSource: r() > 0.3 ? "CITIZEN" : "ADMIN",
          applicantName: citizen.fullName,
          fatherName: "Rajesh Sharma",
          category,
          subject: SUBJECTS[Math.floor(r() * SUBJECTS.length)],
          description: Math.random() > 0.2 ? "Detailed description of the issue reported by the citizen, including location, time of occurrence, and impact on the community." : undefined,
          villageMohalla: VILLAGES[Math.floor(r() * VILLAGES.length)],
          panchayat: PANCHAYATS[Math.floor(r() * PANCHAYATS.length)],
          policeStation: POLICE_STATIONS[Math.floor(r() * POLICE_STATIONS.length)],
          block: BLOCKS[Math.floor(r() * BLOCKS.length)],
          district,
          pincode: String(400000 + Math.floor(r() * 100000)),
          department,
          status,
          adminRemarks: status === "Resolved" || status === "Closed"
            ? "Issue has been addressed by the concerned department. Follow-up inspection scheduled."
            : "Pending review from concerned department.",
          internalNotes: "Verified with field officer. Awaiting departmental confirmation.",
          userId: citizen.id,
          createdAt: created,
          updatedAt: created,
        },
      });
      appCount++;
    }
  }
  console.log(`✅ ${appCount} applications created`);

  // Create reference counter for current year
  const currentYear = new Date().getFullYear();
  await prisma.referenceCounter.upsert({
    where: { year: currentYear },
    create: { year: currentYear, count: appCount + 1 },
    update: { count: appCount + 1 },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
