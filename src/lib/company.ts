export const COMPANY = {
  name: "Award Resin Ltd",
  phone: {
    display: "0800 072 6609",
    href: "tel:08000726609",
  },
  email: {
    address: "awardresinltd@gmail.com",
    href: "mailto:awardresinltd@gmail.com",
  },
  address: {
    lines: ["Innisfree, Allington Lane", "Eastleigh", "SO50 7DE", "United Kingdom"],
  },
} as const;

export const COMPANY_MAPS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  COMPANY.address.lines.join(", ")
)}`;


