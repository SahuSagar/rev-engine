'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { CarSpec } from '@/types/car'

interface CarCardProps {
  car: CarSpec
}

export function CarCard({ car }: CarCardProps) {
  return (
    <Link href={`/cars/${car.slug}`} aria-label={`View ${car.name} details`}>
      <motion.div
        className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-ferrari-card transition-colors duration-200 hover:border-white/20"
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        role="article"
      >
        <div className="relative h-64 overflow-hidden bg-white/5">
          <Image
            src={car.images.hero}
            alt={`${car.name} hero view`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%23111111' width='1920' height='1080'/%3E%3C/svg%3E"
          />
        </div>

        <div className="space-y-3 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white">{car.name}</h3>
              <p className="text-sm text-white/60">{car.year}</p>
            </div>
            <span className="rounded-lg bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
              {car.origin}
            </span>
          </div>

          <div className="space-y-2 border-t border-white/10 pt-3">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Engine</span>
              <span className="font-medium text-white">{car.engine.type}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Power</span>
              <span className="font-medium text-ferrari-red">{car.engine.power}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
