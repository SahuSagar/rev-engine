'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { CarSpec } from '@/types/car'

interface CarHeroProps {
  car: CarSpec
}

export function CarHero({ car }: CarHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden"
    >
      <Image
        src={car.images.hero}
        alt={`${car.name} hero view`}
        fill
        priority
        className="object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ferrari-dark via-transparent to-transparent" />

      {/* Title overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
            {car.name}
          </h1>
          <p className="text-lg md:text-xl text-white/70 mt-2">
            {car.year} • {car.origin}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
