import { cn } from "@/lib/utils"
import { Sticker } from "./sticker"

type StickerVariant = "orange" | "purple" | "pink" | "gold" | "green"

interface SectionHeadingProps {
  title: React.ReactNode
  /** Small uppercase label above the title. */
  eyebrow?: string
  /** Playful chip alternative to the plain eyebrow. */
  sticker?: string
  stickerVariant?: StickerVariant
  description?: React.ReactNode
  align?: "center" | "left"
  className?: string
}

/**
 * Standard "EYEBROW → HEADLINE → SUPPORTING TEXT" section heading from the
 * design system. Pass either a plain `eyebrow` or a `sticker` chip — not both.
 */
export function SectionHeading({
  title,
  eyebrow,
  sticker,
  stickerVariant = "orange",
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  const centered = align === "center"

  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-3",
        centered && "mx-auto items-center text-center",
        className
      )}
    >
      {sticker ? (
        <Sticker variant={stickerVariant}>{sticker}</Sticker>
      ) : eyebrow ? (
        <span className="font-heading text-sm font-semibold tracking-widest text-palace-orange uppercase">
          {eyebrow}
        </span>
      ) : null}

      <h2 className="font-heading text-3xl font-bold text-balance text-bean-black sm:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="max-w-xl text-pretty text-warm-grey">{description}</p>
      )}
    </div>
  )
}
