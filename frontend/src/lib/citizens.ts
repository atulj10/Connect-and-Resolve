export const CITIZEN_DISTRICTS = ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad"];

export type Citizen = {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  state: string;
  district: string;
  totalApplications: number;
  active: boolean;
  registeredAt: string;
  address: string;
};

const FIRST = [
  "Aarav",
  "Priya",
  "Rohan",
  "Ananya",
  "Vikram",
  "Sneha",
  "Karan",
  "Meera",
  "Arjun",
  "Divya",
  "Rahul",
  "Pooja",
  "Aditya",
  "Isha",
  "Sahil",
  "Neha",
  "Manish",
  "Kavya",
  "Yash",
  "Riya",
  "Nikhil",
  "Sakshi",
  "Aman",
  "Tanvi",
];
const LAST = [
  "Sharma",
  "Patel",
  "Mehta",
  "Singh",
  "Reddy",
  "Iyer",
  "Joshi",
  "Nair",
  "Verma",
  "Gupta",
  "Kulkarni",
  "Desai",
  "Bhatt",
  "Kapoor",
  "Malhotra",
  "Chopra",
];

function seeded(i: number) {
  let s = i * 7919 + 104729;
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

export function generateCitizens(count = 56): Citizen[] {
  const r = seeded(7);
  return Array.from({ length: count }, (_, i) => {
    const first = FIRST[Math.floor(r() * FIRST.length)];
    const last = LAST[Math.floor(r() * LAST.length)];
    const district = CITIZEN_DISTRICTS[Math.floor(r() * CITIZEN_DISTRICTS.length)];
    const apps = Math.floor(r() * 9);
    const reg = Math.floor(r() * 720);
    return {
      id: `CTZ-${String(20000 + i).padStart(5, "0")}`,
      fullName: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}${Math.floor(r() * 99)}@mail.com`,
      mobile: `98${Math.floor(10000000 + r() * 89999999)}`,
      state: "Maharashtra",
      district,
      totalApplications: apps,
      active: r() > 0.18,
      registeredAt: daysAgo(reg),
      address: `${Math.floor(r() * 500) + 1}, ${district} Main Road, ${district}`,
    };
  });
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
