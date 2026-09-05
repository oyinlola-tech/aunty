// Business information lives here in one place. Values that are not known
// yet stay empty until the owner provides them (see .env.example).
//
// NEXT_PUBLIC_WHATSAPP_NUMBER: international format without "+" or spaces,
// e.g. 2348012345678 — used to build wa.me links.
//
// Turbopack inlines NEXT_PUBLIC_* variables at build time: a set variable is
// replaced with its value, an unset one with an empty string. Reads must use
// static member access (process.env.NAME) so inlining works, and the values
// are validated so an unset variable degrades gracefully instead of crashing.

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL
const siteUrl =
  typeof rawSiteUrl === "string" && /^https?:\/\//.test(rawSiteUrl.trim())
    ? rawSiteUrl.trim()
    : "http://localhost:3000"

const readText = (value: unknown): string =>
  typeof value === "string" ? value.trim() : ""

export const siteConfig = {
  name: "Soft Beans Palace",
  description:
    "Delicious soft beans and comforting Nigerian meals. Freshly made in Port Harcourt.",
  url: siteUrl,
  location: readText(process.env.NEXT_PUBLIC_LOCATION) || "Port Harcourt, Nigeria",
  contact: {
    whatsapp: readText(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
    phone: readText(process.env.NEXT_PUBLIC_PHONE),
    email: readText(process.env.NEXT_PUBLIC_EMAIL),
  },
  social: {
    tiktok: readText(process.env.NEXT_PUBLIC_TIKTOK),
    facebook: readText(process.env.NEXT_PUBLIC_FACEBOOK),
  },
  hours: {
    weekdays: readText(process.env.NEXT_PUBLIC_HOURS_WEEKDAYS),
    weekends: readText(process.env.NEXT_PUBLIC_HOURS_WEEKENDS),
  },
  // Manual bank-transfer payment details used at checkout. This is NOT a
  // payment gateway: the website only shows the account and asks the
  // customer to transfer externally, then send the receipt via WhatsApp.
  // Leave empty until the owner provides the real account.
  payment: {
    bankName: readText(process.env.NEXT_PUBLIC_BANK_NAME),
    accountName: readText(process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME),
    accountNumber: readText(process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER),
  },
}
