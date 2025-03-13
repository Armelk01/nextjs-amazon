'use client'

import useColorStore from '@/hooks/use-color-store'
import { useTheme } from 'next-themes'
import React from 'react'
import { PieChart, Pie, ResponsiveContainer, Cell } from 'recharts'

// Définir une interface pour les données du graphique
interface PieChartData {
  _id: string
  totalSales: number
}

// Interface pour les props de SalesCategoryPieChart
interface SalesCategoryPieChartProps {
  data: PieChartData[]
}

// Interface pour les props de renderCustomizedLabel
interface CustomLabelProps {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  index: number
}

export default function SalesCategoryPieChart({ data }: SalesCategoryPieChartProps) {
  const { theme } = useTheme()
  const { cssColors } = useColorStore(theme)

  const RADIAN = Math.PI / 180

  // Fonction pour rendre un label personnalisé
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }: CustomLabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
        className='text-xs'
      >
        {`${data[index]._id} ${data[index].totalSales} sales`}
      </text>
    )
  }

  return (
    <ResponsiveContainer width='100%' height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey='totalSales'
          cx='50%'
          cy='50%'
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={`hsl(${cssColors['--primary']})`}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}