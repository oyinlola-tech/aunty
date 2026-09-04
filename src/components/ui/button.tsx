import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent text-sm font-semibold whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-palace-orange text-white hover:bg-palace-orange-hover shadow-sm",
        dark:
          "bg-espresso text-white hover:bg-espresso/90 shadow-sm",
        outline:
          "border-border bg-transparent text-bean-black hover:bg-cream-deep",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "bg-transparent text-bean-black hover:bg-cream-deep",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90",
        link:
          "text-palace-orange underline-offset-4 hover:underline bg-transparent",
      },
      size: {
        default: "h-11 gap-2 px-6 rounded-full text-sm",
        sm: "h-9 gap-1.5 px-4 rounded-full text-xs",
        lg: "h-12 gap-2 px-8 rounded-full text-base",
        icon: "size-10 rounded-full",
        "icon-sm": "size-8 rounded-full",
        "icon-lg": "size-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
