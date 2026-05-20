import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCarBySlug } from '@/lib/data/cars'
import { CarHero } from '@/components/cars/CarHero'
import { SpecTable } from '@/components/cars/SpecTable'
import { EngineDetails } from '@/components/cars/EngineDetails'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const car = getCarBySlug(slug)

  if (!car) {
    return {
      title: 'Car Not Found — RevEngine',
    }
  }

  return {
    title: `${car.name} — RevEngine`,
    description: `Hear the ${car.name} engine sound simulator. ${car.engine.soundCharacter.slice(0, 100)}...`,
    openGraph: {
      title: `${car.name} — RevEngine`,
      description: `Experience the legendary ${car.name} engine sound.`,
      images: [car.images.hero],
    },
  }
}

export default async function CarPage({ params }: Props) {
  const { slug } = await params
  const car = getCarBySlug(slug)

  if (!car) {
    notFound()
  }

  return (
    <main className="space-y-16 md:space-y-20 lg:space-y-24">
      {/* Hero */}
      <div className="px-6 md:px-12 lg:px-24">
        <CarHero car={car} />
      </div>

      {/* Specs and Engine Details */}
      <div className="px-6 md:px-12 lg:px-24">
        <div className="space-y-16">
          <SpecTable car={car} />
          <EngineDetails engine={car.engine} />
        </div>
      </div>

      {/* Placeholder for audio simulator (Phase 6) */}
      <div className="px-6 md:px-12 lg:px-24 pb-16 md:pb-20">
        <div className="rounded-2xl border border-white/10 bg-ferrari-card/50 p-8 md:p-12 text-center">
          <p className="text-white/60">Sound Simulator coming soon...</p>
        </div>
      </div>
    </main>
  )
}
