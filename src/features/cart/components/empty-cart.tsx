import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center gap-6 py-12 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-cream-deep">
        <ShoppingBag className="size-8 text-warm-grey" />
      </div>

      <div>
        <h3 className="font-heading text-xl font-bold text-bean-black">
          Your plate is waiting
        </h3>
        <p className="mt-2 text-warm-grey">
          You haven&apos;t added anything yet. Let&apos;s fix that.
        </p>
      </div>

      <Link
        href="/menu"
        className="group inline-flex items-center gap-2 rounded-full bg-palace-orange px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-palace-orange-hover"
      >
        Explore Menu
        <svg
          className="size-4 transition-transform group-hover:translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  )
}
