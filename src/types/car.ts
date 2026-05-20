export interface AudioGains {
  idle: number
  low: number
  mid: number
  high: number
}

export interface AudioConfig {
  startup: string
  idle: string
  lowRev: string
  midRev: string
  highRev: string
}

export interface CarImages {
  hero: string
  side: string
  engine: string
}

export interface EngineSpec {
  code: string
  type: string
  displacement: string
  power: string
  torque: string
  redline: number
  soundCharacter: string
}

export interface CarSpec {
  slug: string
  name: string
  year: string
  origin: string
  price: string
  weight: string
  topSpeed: string
  zeroToHundred: string
  transmission: string
  engine: EngineSpec
  audio: AudioConfig
  images: CarImages
}
