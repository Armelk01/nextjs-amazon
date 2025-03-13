'use client'

import ProductPrice from '@/components/shared/product/product-price'
import { Card, CardContent } from '@/components/ui/card'
import useColorStore from '@/hooks/use-color-store'
import { formatDateTime } from '@/lib/utils'
import { useTheme } from 'next-themes'
import React from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'

// Définir une interface pour les données du graphique
interface SalesData {
  date: string
  totalSales: number
}

// Interface pour les props de CustomTooltip
interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean
  payload?: { value: number }[]
  label?: string
}

// Composant CustomTooltip avec des types spécifiques
const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <Card>
        <CardContent className='p-2'>
          <p>{label && formatDateTime(new Date(label)).dateOnly}</p>
          <p className='text-primary text-xl'>
            <ProductPrice price={payload[0].value} plain />
          </p>
        </CardContent>
      </Card>
    )
  }
  return null
}

// Interface pour les props de CustomXAxisTick
interface CustomXAxisTickProps {
  x: number
  y: number
  payload: { value: string }
}

// Composant CustomXAxisTick avec des types spécifiques
const CustomXAxisTick: React.FC<CustomXAxisTickProps> = ({ x, y, payload }) => {
  return (
    <text x={x} y={y + 10} textAnchor='left' fill='#666' className='text-xs'>
      {formatDateTime(new Date(payload.value)).dateOnly}
    </text>
  )
}

// Définir les couleurs de stroke pour les thèmes
const STROKE_COLORS: { [key: string]: { [key: string]: string } } = {
  Red: { light: '#980404', dark: '#ff3333' },
  Green: { light: '#015001', dark: '#06dc06' },
  Gold: { light: '#ac9103', dark: '#f1d541' },
}

// Interface pour les props de SalesAreaChart
interface SalesAreaChartProps {
  data: SalesData[]
}

// Composant SalesAreaChart avec des types spécifiques
export default function SalesAreaChart({ data }: SalesAreaChartProps) {
  const { theme } = useTheme()
  const { cssColors, color } = useColorStore(theme)

  return (
    <ResponsiveContainer width='100%' height={400}>
      <AreaChart data={data}>
        <CartesianGrid horizontal={true} vertical={false} stroke='' />
        <XAxis dataKey='date' tick={<CustomXAxisTick x={0} y={0} payload={{
          value: ''
        }} />} interval={3} />
        <YAxis fontSize={12} tickFormatter={(value: number) => `$${value}`} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type='monotone'
          dataKey='totalSales'
          stroke={STROKE_COLORS[color.name][theme || 'light']}
          strokeWidth={2}
          fill={`hsl(${cssColors['--primary']})`}
          fillOpacity={0.8}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}