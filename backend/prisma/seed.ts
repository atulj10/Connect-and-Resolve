import "dotenv/config";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const districtBlocks = JSON.parse(
  readFileSync(join(__dirname, "../../frontend/src/assets/district_blocks.json"), "utf-8"),
) as { district: string; block: string[] }[];

const DISTRICTS = districtBlocks.map((d) => d.district);
const ALL_BLOCKS = districtBlocks.flatMap((d) => d.block);

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

const POLICE_STATIONS = ["City PS", "Sadar PS", "Rural PS", "Model PS"];

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

function pickRandomBlock(district: string): string {
  const entry = districtBlocks.find((d) => d.district === district);
  if (!entry || entry.block.length === 0) return "General Block";
  return entry.block[Math.floor(Math.random() * entry.block.length)];
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

  // Create admin (credentials from env or defaults)
  const adminName = process.env.ADMIN_NAME || "Rajeev Menon";
  const adminEmail = process.env.ADMIN_EMAIL || "rajeev.menon@minister.gov.in";
  const adminPasswordRaw = process.env.ADMIN_PASSWORD || "admin@123";
  const adminPassword = await bcrypt.hash(adminPasswordRaw, 10);
  const admin = await prisma.user.create({
    data: {
      fullName: adminName,
      mobileNumber: "9999999999",
      email: adminEmail,
      role: "ADMIN",
      password: adminPassword,
      mobileVerified: true,
      emailVerified: true,
    },
  });
  console.log(`✅ Admin created: ${adminEmail} / ${adminPasswordRaw}`);

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

  // Create 100 applications
  const r = seeded(42);
  const APP_COUNT = 100;
  const yearPrefix = `MIN/${new Date().getFullYear()}/`;

  for (let i = 0; i < APP_COUNT; i++) {
    const citizen = citizens[Math.floor(r() * citizens.length)];
    const refNo = `${yearPrefix}${String(i + 1).padStart(8, "0")}`;
    const created = daysAgo(Math.floor(r() * 365));
    const category = CATEGORIES[Math.floor(r() * CATEGORIES.length)];
    const department = DEPARTMENTS[Math.floor(r() * DEPARTMENTS.length)];
    const status = STATUSES[Math.floor(r() * STATUSES.length)];
    const district = DISTRICTS[Math.floor(r() * DISTRICTS.length)];
    const block = pickRandomBlock(district);
    const village = ALL_BLOCKS[Math.floor(r() * ALL_BLOCKS.length)];

    await prisma.application.create({
      data: {
        referenceNumber: refNo,
        applicationSource: r() > 0.3 ? "CITIZEN" : "ADMIN",
        applicantName: citizen.fullName,
        fatherName: "Rajesh Sharma",
        category,
        subject: SUBJECTS[Math.floor(r() * SUBJECTS.length)],
        description: Math.random() > 0.2
          ? "Detailed description of the issue reported by the citizen, including location, time of occurrence, and impact on the community."
          : undefined,
        villageMohalla: village,
        panchayat: `Gram Panchayat ${village}`,
        policeStation: POLICE_STATIONS[Math.floor(r() * POLICE_STATIONS.length)],
        block,
        district,
        pincode: String(800000 + Math.floor(r() * 100000)),
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
  }
  console.log(`✅ ${APP_COUNT} applications created`);

  // Create reference counter for current year
  const currentYear = new Date().getFullYear();
  await prisma.referenceCounter.upsert({
    where: { year: currentYear },
    create: { year: currentYear, count: APP_COUNT + 1 },
    update: { count: APP_COUNT + 1 },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
