import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
          <span className="font-muted-foreground">
            Создано с помощью{' '}
            <ExternalLink href="https://tradingview.com">
              TradingView Widgets
            </ExternalLink>
            и{' '}
            <ExternalLink href="https://groq.com">
              Llama3-70b on Groq
            </ExternalLink>
          </span>
    </p>
  )
}
