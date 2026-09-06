"use client";

import { Landmark } from "lucide-react";

interface PaymentSectionProps {
  amount: number;
  payment: {
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
  };
}

export function PaymentSection({ amount, payment }: PaymentSectionProps) {
  const hasDetails = payment.bankName || payment.accountName || payment.accountNumber

  if (!hasDetails) {
    return (
      <div className="rounded-2xl border border-border/50 bg-cream p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-palace-orange/10">
            <Landmark className="size-5 text-palace-orange" />
          </div>
          <div>
            <h3 className="font-heading text-base font-bold text-bean-black">
              Pay by Bank Transfer
            </h3>
            <p className="text-xs text-warm-grey">
              Payment details are being set up. You&apos;ll receive account information on WhatsApp after placing your order.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-cream p-5">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-palace-orange/10">
          <Landmark className="size-5 text-palace-orange" />
        </div>
        <div>
          <h3 className="font-heading text-base font-bold text-bean-black">
            Bank Transfer
          </h3>
          <p className="text-xs text-warm-grey">
            Transfer {amount > 0 ? `₦${amount.toLocaleString()}` : "the amount"} to the account below, then send your receipt on WhatsApp.
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-1.5 text-sm">
        {payment.bankName && (
          <p className="text-bean-black">
            <span className="text-warm-grey">Bank:</span> {payment.bankName}
          </p>
        )}
        {payment.accountName && (
          <p className="text-bean-black">
            <span className="text-warm-grey">Name:</span> {payment.accountName}
          </p>
        )}
        {payment.accountNumber && (
          <p className="text-bean-black">
            <span className="text-warm-grey">Account:</span> {payment.accountNumber}
          </p>
        )}
      </div>
    </div>
  );
}
