'use client';

import * as React from 'react';
import { useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function TickerTape() {
  const container = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  // Update the current theme based on resolvedTheme
  useEffect(() => {
    if (!resolvedTheme) return;
    setCurrentTheme(resolvedTheme === 'dark' ? 'dark' : 'light');
  }, [resolvedTheme]);

  // Inject the TradingView script
  useEffect(() => {
    if (!container.current) return;

    // Clear the container before injecting the script
    container.current.innerHTML = '';

    // Create a unique script element
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { description: 'Bitcoin', proName: 'BINANCE:BTCUSDT' },
        { description: 'Ethereum', proName: 'BINANCE:ETHUSDT' },
        { description: 'Solana', proName: 'BINANCE:SOLUSDT' },
        { description: 'Cardano', proName: 'BINANCE:ADAUSDT' },
        { description: 'Polkadot', proName: 'BINANCE:DOTUSDT' },
        { description: 'Avalanche', proName: 'BINANCE:AVAXUSDT' },
        { description: 'Uniswap', proName: 'BINANCE:UNIUSDT' },
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: 'adaptive',
      colorTheme: currentTheme,
      locale: 'en',
    });

    // Append the script to the container
    container.current.appendChild(script);

    // Cleanup function to remove the script
    return () => {
      if (container.current) {
        container.current.innerHTML = ''; // Clear the container
      }
    };
  }, [currentTheme]); // Re-run when the theme changes

  return (
    <div className="tradingview-widget-container mb-2 md:min-h-20 min-h-28" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}
