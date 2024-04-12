import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'

const typographyVariants = cva("",
  {
    variants: {
      variant: {
        h1: "scroll-m-20 text-4xl font-extrabold tracking-tight",
        h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
        h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
        h4: "scroll-m-20 text-xl font-semibold tracking-tight",
        p: "leading-7"
      }
    },
    defaultVariants: {
      variant: "h1",
    },
  }
)

export interface TypographyProps
  extends VariantProps<typeof typographyVariants> {
  className?: string
  children?: React.ReactNode
}

const Typography: React.FC<TypographyProps> = ({ className, children, variant = 'h1' }) => {
  const Comp = variant!

  return (
    <Comp className={cn(typographyVariants({ variant, className }))}>
      {children}
    </Comp>
  )
}

Typography.displayName = "Typography"

export { Typography, typographyVariants }
