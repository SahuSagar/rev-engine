'use client'

import { motion } from 'framer-motion'
import type { EngineSpec } from '@/types/car'

interface EngineDetailsProps {
  engine: EngineSpec
}

export function EngineDetails({ engine }: EngineDetailsProps) {
  const engineSpecs = [
    { label: 'Engine Code', value: engine.code },
    { label: 'Type', value: engine.type },
    { label: 'Displacement', value: engine.displacement },
    { label: 'Power', value: engine.power },
    { label: 'Torque', value: engine.torque },
    { label: 'Redline', value: `${engine.redline} RPM` },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 }}
      className="space-y-12"
    >
      {/* Engine specs */}
      <div className="rounded-2xl border border-white/10 bg-ferrari-card p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Engine</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {engineSpecs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.35 + i * 0.05 }}
            >
              <p className="text-sm text-white/60 uppercase tracking-wide mb-1">
                {spec.label}
              </p>
              <p className="text-lg font-semibold text-white">{spec.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why it sounds */}
      <div className="rounded-2xl border border-white/10 bg-ferrari-card p-6 md:p-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Why It Sounds</h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-base text-white/80 leading-relaxed"
        >
          {engine.soundCharacter}
        </motion.p>
      </div>
    </motion.div>
  )
}
