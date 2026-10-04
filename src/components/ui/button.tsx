import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 visited:text-primary-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 visited:text-destructive-foreground",
        outline:
          /* QA 04/10 19:36: stati :active per feedback di pressione su touch.
             I bottoni outline dorati di page.tsx li definiscono già inline;
             così anche gli outline "lisci" (custom-jewel, orders, not-found)
             rispondono al tap senza restare "congelati" in hover. */
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent active:text-accent-foreground visited:text-current",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 visited:text-secondary-foreground",
        ghost:
          /* QA 03/10 22:36: visited:text-current come le altre variant — ghost
             oggi è usato solo su <button>, ma se domani un ghost diventa
             asChild con <a>, il colore visited del browser non sporcherà
             più il testo ereditato. */
          "hover:bg-accent hover:text-accent-foreground visited:text-current",
        link: "text-primary underline-offset-4 hover:underline visited:text-primary",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
