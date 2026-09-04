import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SectionContainer } from "@/components/shared/section-container"
import { Sticker } from "@/components/shared/sticker"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <SectionContainer className="flex flex-col items-center gap-8 py-16 text-center">
      <div className="flex size-24 items-center justify-center rounded-full bg-cream-deep">
        <svg
          className="size-12 text-warm-grey"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Sticker variant="orange">Oops</Sticker>
        <h1 className="font-heading text-3xl font-bold text-bean-black">
          Looks like this plate went missing.
        </h1>
        <p className="max-w-sm text-warm-grey">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>

      <Link
        href="/menu"
        className={cn(buttonVariants({ size: "lg" }), "no-underline")}
      >
        Back to the Menu
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </SectionContainer>
  )
}
