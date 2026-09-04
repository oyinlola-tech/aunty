import Link from "next/link"
import { SectionContainer } from "@/components/shared/section-container"
import { Sticker } from "@/components/shared/sticker"

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
        className="group inline-flex items-center gap-2 rounded-full bg-palace-orange px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-palace-orange-hover"
      >
        Back to the Menu
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
    </SectionContainer>
  )
}
