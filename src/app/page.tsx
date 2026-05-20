'use client'

import { motion } from 'framer-motion'
import { getAllCars } from '@/lib/data/cars'
import { CarGrid } from '@/components/cars/CarGrid'

export default function Home() {
  const cars = getAllCars()

  return (
    <motion.div
      className="min-h-screen bg-ferrari-dark py-16 px-6 md:px-12 lg:px-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-5xl font-bold tracking-tight text-white mb-4">
            RevEngine
          </h1>
          <p className="text-lg text-white/60">
            Experience the sound of pure automotive passion. Hear Ferrari legends come alive.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CarGrid cars={cars} />
        </motion.div>
      </main>
    </motion.div>
  )
}
