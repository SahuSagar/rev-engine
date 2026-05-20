'use client'

import { motion } from 'framer-motion'
import type { CarSpec } from '@/types/car'

interface SpecTableProps {
  car: CarSpec
}

const specs = [
  { label: 'Power', key: 'power' },
  { label: 'Torque', key: 'torque' },
  { label: '0–100 mph', key: 'zeroToHundred' },
  { label: 'Top Speed', key: 'topSpeed' },
  { label: 'Weight', key: 'weight' },
  { label: 'Transmission', key: 'transmission' },
] as const

export function SpecTable({ car }: SpecTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
      className="rounded-2xl border border-white/10 bg-ferrari-card p-6 md:p-8"
    >
      <h2 className="text-2xl font-semibold text-white mb-6">Performance</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {specs.map((spec, i) => {
          const value = car[spec.key as keyof typeof car]
          return (
            <motion.div
              key={spec.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 + i * 0.05 }}
            >
              <p className="text-sm text-white/60 uppercase tracking-wide mb-1">
                {spec.label}
              </p>
              <p className="text-lg md:text-xl font-semibold text-white">
                {String(value)}
              </p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
