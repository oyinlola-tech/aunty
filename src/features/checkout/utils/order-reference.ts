/**
 * Generates a unique, human-readable order reference such as
 *
 *   SBP-20260904-A82F7C
 *
 * SBP = Soft Beans Palace, followed by the current date (YYYYMMDD) and a
 * six-character uppercase identifier. The identifier is drawn from a
 * cryptographically secure random source where available (browsers and
 * modern Node) and only falls back to Math.random in environments without
 * one.
 *
 * A reference is created once per checkout submission and must stay stable
 * for the whole action — it is shown in the confirmation UI, embedded in the
 * WhatsApp message (top and bottom) and used as the transfer narration so
 * the vendor can match the order to the bank payment.
 */
export function generateOrderReference(date: Date = new Date()): string {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, "0")
  const dd = String(date.getDate()).padStart(2, "0")

  return `SBP-${yyyy}${mm}${dd}-${randomHex(6)}`
}

/** Six random hex characters, uppercased, from crypto when available. */
function randomHex(length: number): string {
  const bytes = new Uint8Array(length)

  const cryptoApi =
    typeof globalThis !== "undefined" &&
    typeof globalThis.crypto !== "undefined" &&
    typeof globalThis.crypto.getRandomValues === "function"
      ? globalThis.crypto
      : null

  if (cryptoApi) {
    cryptoApi.getRandomValues(bytes)
  } else {
    for (let i = 0; i < bytes.length; i += 1) {
      bytes[i] = Math.floor(Math.random() * 256)
    }
  }

  return Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, "0")
  )
    .join("")
    .slice(0, length)
    .toUpperCase()
}
