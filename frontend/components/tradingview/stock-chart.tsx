'use client'

import React, { useEffect, useRef, memo } from 'react'
import { createChart } from 'lightweight-charts'
import { useTheme } from 'next-themes'

type ExchangeData = {
  exchange: string
  data: Array<{ time: number; open: number; high: number; low: number; close: number }>
}

export function StockChart({ customData }: { customData: ExchangeData[] }) {
  const container = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!container.current) return

    const isDark = theme === 'dark'
    const chartColors = isDark
      ? { backgroundColor: '#111112', textColor: '#FFFFFF', gridColor: '#555555' }
      : { backgroundColor: '#f9f9fa', textColor: '#000000', gridColor: 'rgba(230,230,230)' }

    const chart = createChart(container.current, {
      width: container.current.clientWidth,
      height: container.current.clientHeight,
      layout: { background: { type: 'solid', color: chartColors.backgroundColor }, textColor: chartColors.textColor },
      grid: { vertLines: { color: chartColors.gridColor }, horzLines: { color: chartColors.gridColor } },
      timeScale: { timeVisible: true, secondsVisible: false, borderColor: '#D1D4DC' },
    })

    // Цвета графиков
    const colors = [
      { up: '#26a69a', down: '#ef5350', labelColor: '#26a69a' }, // Зеленый/Красный
      { up: '#2196f3', down: '#0d47a1', labelColor: '#2196f3' }, // Синий/Темно-синий
    ]

    // Отображаем свечные графики
    customData.forEach((exchange, index) => {
      const candleSeries = chart.addCandlestickSeries({
        upColor: colors[index].up,
        downColor: colors[index].down,
        borderUpColor: colors[index].up,
        borderDownColor: colors[index].down,
        wickUpColor: colors[index].up,
        wickDownColor: colors[index].down,
      })
      candleSeries.setData(exchange.data)

      // Добавляем подпись биржи в правом верхнем углу
      const priceScale = candleSeries.priceScale()
      priceScale.applyOptions({ borderColor: colors[index].labelColor })

      const legend = document.createElement('div')
      legend.innerText = exchange.exchange
      legend.style.position = 'absolute'
      legend.style.top = `${10 + index * 20}px`
      legend.style.right = '10px'
      legend.style.color = colors[index].labelColor
      legend.style.fontSize = '14px'
      legend.style.fontWeight = 'bold'
      legend.style.background = isDark ? '#222' : '#fff'
      legend.style.padding = '2px 8px'
      legend.style.borderRadius = '4px'
      legend.style.boxShadow = '0px 2px 5px rgba(0,0,0,0.2)'
      container.current.appendChild(legend)
    })

    // Добавляем линию на уровне 0
    const zeroLine = chart.addLineSeries({
      color: 'rgba(43, 167, 255, 0.87)', // Серый цвет с прозрачностью
      lineWidth: 2,
      lineStyle: 1, // Пунктирная линия
    })

    // Генерируем данные для линии 0
    const zeroLineData = customData[0]?.data.map((point) => ({
      time: point.time,
      value: 0,
    })) || []

    zeroLine.setData(zeroLineData)

    chart.timeScale().fitContent()

    return () => {
      chart.remove()
      container.current?.querySelectorAll('div').forEach((el) => el.remove()) // Удаляем легенду при размонтировании
    }
  }, [customData, theme])

  return <div ref={container} style={{ height: '100%', width: '100%', position: 'relative' }} />
}

export default memo(StockChart)
