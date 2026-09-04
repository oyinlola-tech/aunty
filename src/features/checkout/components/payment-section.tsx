"use client"

import { useRef, useState } from "react"
import { Check, Copy, Landmark } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/currency"
import { Button } from "@/components/ui/button"
import type { siteConfig } from "@/config/site"

type PaymentConfig = typeof siteConfig.payment

interface PaymentSectionProps {
  /** Total the customer should transfer (the frontend-calculated subtotal). */
  amount: number
  payment: PaymentConfig
}

/**
 * Manual bank-transfer instructions for Phase 1. There is no payment gateway
 * and nothing here verifies a transfer: the customer pays their bank
 * externally, then indicates they have paid and attaches the receipt to the
 * WhatsApp order. All account details come from src/config/site.ts.
 */
export function PaymentSection({ amount, payment }: PaymentSectionProps) {
  const accountNumber = payment.accountNumber.trim()
  const hasAccount = Boolean(accountNumber)
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleCopy = async () => {
    if (!hasAccount || copied) return

    const text = accountNumber.replace(/\s+/g, "")
    let ok = false

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
        ok = true
      }
    } catch {
      ok = false
    }

    // Fallback for browsers without the async clipboard API / non-secure
    // contexts: select the number from a temporary field and execCommand.
    if (!ok) {
      const field = document.createElement("textarea")
      field.value = text
      field.setAttribute("readonly", "")
      field.style.position = "fixed"
      field.style.opacity = "0"
      document.body.appendChild(field)
      field.select()
      try {
        ok = document.execCommand("copy")
      } catch {
        ok = false
      }
      document.body.removeChild(field)
    }

    if (ok) {
      setCopied(true)
      if (copyTimer.current) clearTimeout(copyTimer.current)
      copyTimer.current = setTimeout(() => setCopied(false), 2400)
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-espresso p-5 text-white">
      <div className="flex items-start gap-3">
        <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-palace-orange">
          <Landmark className="size-5" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-0.5">
          <h3 className="font-heading text-lg font-bold">Pay by Bank Transfer</h3>
          <p className="text-sm text-white/75">
            No online payment — transfer to our account, then send your
            receipt on WhatsApp.
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-white/10 p-4">
        <p className="text-xs tracking-wide text-white/70 uppercase">
          Amount to pay
        </p>
        <p className="mt-0.5 font-heading text-2xl font-bold text-palace-orange">
          {amount > 0 ? formatCurrency(amount) : "To be confirmed"}
        </p>
        {amount <= 0 && (
          <p className="mt-1 text-xs text-white/70">
            Your total is confirmed with us before you pay.
          </p>
        )}
      </div>

      {hasAccount ? (
        <dl className="flex flex-col gap-2.5 text-sm">
          {payment.bankName && (
            <div className="flex items-center justify-between gap-3">
              <dt className="text-white/70">Bank</dt>
              <dd className="text-right font-semibold">{payment.bankName}</dd>
            </div>
          )}
          {payment.accountName && (
            <div className="flex items-center justify-between gap-3">
              <dt className="text-white/70">Account name</dt>
              <dd className="text-right font-semibold">{payment.accountName}</dd>
            </div>
          )}
          <div className="flex items-center justify-between gap-3">
            <dt className="text-white/70">Account number</dt>
            <dd className="flex items-center gap-2">
              <span className="font-mono text-base font-bold tracking-wider">
                {accountNumber}
              </span>
              <Button
                type="button"
                variant="soft"
                size="sm"
                className="h-9 shrink-0 bg-white/10 text-white hover:border-white/40 hover:bg-white hover:text-espresso"
                onClick={handleCopy}
                aria-label="Copy account number"
              >
                {copied ? (
                  <>
                    <Check className="size-3.5" aria-hidden="true" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="size-3.5" aria-hidden="true" />
                    Copy
                  </>
                )}
              </Button>
            </dd>
          </div>
        </dl>
      ) : (
        <p className="rounded-xl bg-white/10 p-3 text-sm leading-relaxed text-white/80">
          Our bank account details will be shared with you on WhatsApp when
          you send your order.
        </p>
      )}

      <ol className="flex flex-col gap-2 border-t border-white/15 pt-4 text-xs leading-relaxed text-white/75">
        <li className="flex gap-2">
          <span className="font-bold text-palace-orange">1.</span>
          Transfer the amount above to our account from your bank app.
        </li>
        <li className="flex gap-2">
          <span className="font-bold text-palace-orange">2.</span>
          Return here and tap &ldquo;I&apos;ve made payment&rdquo;.
        </li>
        <li className="flex gap-2">
          <span className="font-bold text-palace-orange">3.</span>
          WhatsApp opens with your order and a unique order reference
          (SBP-…).
        </li>
        <li className="flex gap-2">
          <span className="font-bold text-palace-orange">4.</span>
          Attach your transfer receipt screenshot before sending, then keep
          the reference for follow-up.
        </li>
      </ol>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          "rounded-lg px-3 py-2 text-xs font-medium transition-colors",
          copied
            ? "bg-muted-green/25 text-white"
            : "bg-white/10 text-white/60"
        )}
      >
        {copied
          ? "Account number copied to your clipboard."
          : "Payment is confirmed by us manually when your receipt arrives — this website never verifies it automatically."}
      </p>
    </div>
  )
}
