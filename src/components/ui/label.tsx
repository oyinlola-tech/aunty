import * as React from "react"
import { cn } from "@/lib/utils"

const Label = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<"label"> & {
    className?: string
  }
>((props, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium text-bean-black",
      props.className
    )}
    {...props}
  />
))
Label.displayName = "Label"

export { Label }
