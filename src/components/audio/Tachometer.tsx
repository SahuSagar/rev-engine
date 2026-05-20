'use client'

import { motion } from 'framer-motion'
import { useTachometer } from '@/hooks/useTachometer'
import { cn } from '@/lib/utils/cn'

interface TachometerProps {
  rpm: number
  maxRPM: number
}

export function Tachometer({ rpm, maxRPM }: TachometerProps) {
  const { angle } = useTachometer(rpm, maxRPM)
  const isRedline = rpm > 8500

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Gauge Container */}
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        {/* Outer Ring */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 200 200"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background Circle */}
          <circle cx="100" cy="100" r="95" fill="rgb(17, 17, 17)" stroke="rgb(31, 31, 31)" strokeWidth="2" />

          {/* Green Zone (0–5000 RPM) */}
          <path
            d="M 100,100 L 100,10 A 90,90 0 0,1 163.4,23.4"
            fill="none"
            stroke="rgb(34, 197, 94)"
            strokeWidth="8"
            opacity="0.6"
            strokeLinecap="round"
          />

          {/* Amber Zone (5000–7500 RPM) */}
          <path
            d="M 163.4,23.4 A 90,90 0 0,1 181.8,69.1"
            fill="none"
            stroke="rgb(245, 158, 11)"
            strokeWidth="8"
            opacity="0.6"
            strokeLinecap="round"
          />

          {/* Red Zone (7500–9000 RPM) */}
          <path
            d="M 181.8,69.1 A 90,90 0 0,1 163.4,176.6"
            fill="none"
            stroke="rgb(220, 38, 38)"
            strokeWidth="8"
            opacity={isRedline ? 1 : 0.8}
            strokeLinecap="round"
            className={isRedline ? 'animate-pulse' : ''}
          />

          {/* Tick marks */}
          {Array.from({ length: 10 }).map((_, i) => {
            const tickAngle = (i / 9) * 270 - 135
            const x1 = 100 + 85 * Math.cos((tickAngle * Math.PI) / 180)
            const y1 = 100 + 85 * Math.sin((tickAngle * Math.PI) / 180)
            const x2 = 100 + 95 * Math.cos((tickAngle * Math.PI) / 180)
            const y2 = 100 + 95 * Math.sin((tickAngle * Math.PI) / 180)
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgb(255, 255, 255)"
                strokeWidth="1.5"
                opacity="0.5"
              />
            )
          })}

          {/* Needle */}
          <motion.g
            animate={{ rotate: angle }}
            transition={{ type: 'spring', stiffness: 80, damping: 20, mass: 0.5 }}
            origin="100 100"
          >
            <line x1="100" y1="100" x2="100" y2="25" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="100" cy="100" r="4" fill="white" />
          </motion.g>
        </svg>
      </div>

      {/* Digital Readout */}
      <div className="text-center space-y-1">
        <div className="font-mono text-4xl font-bold text-white">{Math.round(rpm).toLocaleString()}</div>
        <div className="text-sm text-white/60">RPM</div>
      </div>
    </div>
  )
}
