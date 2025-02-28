'use client'

import { cn } from '@/lib/utils'
import ExchangeSelecting from '@/components/exchange-selecting'
import { EmptyScreen } from '@/components/empty-screen'
import { useState } from 'react'
import { TickerTape } from '@/components/tradingview/ticker-tape'

export function Chat() {
  const [selectedExchanges, setSelectedExchanges] = useState<string[]>([])

  return (
    <div className="group w-full overflow-x-hidden pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
      {/* Отображаем TickerTape */}
      <TickerTape />

      {/* Отображаем EmptyScreen (если нужно) */}
      {/* <div className={cn('pb-[200px] pt-4 md:pt-3')}>
         <EmptyScreen />
      </div>*/}

      {/* Компонент выбора бирж */}
      <ExchangeSelecting 
        selectedExchanges={selectedExchanges} 
        setSelectedExchanges={setSelectedExchanges} 
      />
    </div>
  )
}
