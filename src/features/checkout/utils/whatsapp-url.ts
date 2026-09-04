/**
 * Converts a raw business number into the international format wa.me needs:
 * digits only, Nigeria country code (+234) implied for local "0…" numbers.
 *
 * Examples:
 *   "09133519489"  -> "2349133519489"
 *   "+234 913 351 9489" -> "2349133519489"
 *   "2349133519489" -> "2349133519489"
 *
 * The business is based in Port Harcourt, Nigeria, so a leading "0" always
 * means a local Nigerian number. Numbers already in international form are
 * left untouched.
 */
export function normalizeWhatsAppNumber(rawNumber: string): string {
  const digits = rawNumber.replace(/\D/g, "")

  if (digits.startsWith("0")) {
    return `234${digits.slice(1)}`
  }

  return digits
}

export function createWhatsAppUrl(
  phoneNumber: string,
  message: string
): string {
  const normalized = normalizeWhatsAppNumber(phoneNumber)
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${normalized}?text=${encodedMessage}`
}
