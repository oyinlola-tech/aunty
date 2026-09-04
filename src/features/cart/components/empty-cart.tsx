import Link from "next/link"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
        className={cn(buttonVariants({ size: "lg" }), "no-underline")}
      >
        Explore Menu
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  )
}
