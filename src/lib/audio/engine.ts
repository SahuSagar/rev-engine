import type { AudioGains } from '@/types/car'
import type { AudioBuffers } from './types'

export const IDLE_RPM = 800
export const MAX_RPM = 9000
const RISE_FACTOR = 0.08
const FALL_FACTOR = 0.06

export function getLayerGains(rpm: number): AudioGains {
  return {
    idle:
      rpm < 1500 ? 1.0 : Math.max(0, 1 - (rpm - 1500) / 1500),

    low:
      rpm < 1000
        ? 0
        : rpm < 2500
          ? (rpm - 1000) / 1500
          : rpm < 4000
            ? 1.0
            : Math.max(0, 1 - (rpm - 4000) / 1500),

    mid:
      rpm < 3000
        ? 0
        : rpm < 4500
          ? (rpm - 3000) / 1500
          : rpm < 6500
            ? 1.0
            : Math.max(0, 1 - (rpm - 6500) / 1500),

    high:
      rpm < 5000 ? 0 : Math.min(1, (rpm - 5000) / 2000),
  }
}

export function updateRPM(currentRPM: number, isAccelerating: boolean): number {
  if (isAccelerating) {
    return Math.min(currentRPM + (MAX_RPM - currentRPM) * RISE_FACTOR, MAX_RPM)
  }
  return Math.max(currentRPM * (1 - FALL_FACTOR), IDLE_RPM)
}

export function getPlaybackRate(rpm: number): number {
  const base = 1.0
  const range = 0.3
  return base + (rpm / MAX_RPM) * range
}

export class EngineAudio {
  private static context: AudioContext | null = null
  private buffers: AudioBuffers | null = null
  private sourceNodes: AudioBufferSourceNode[] = []
  private gainNodes: GainNode[] = []
  private masterGain: GainNode | null = null
  private isPlaying = false
  private currentRPM = IDLE_RPM

  static getContext(): AudioContext {
    if (!this.context) {
      this.context = new AudioContext()
    }
    return this.context
  }

  async preloadAudio(carSlug: string): Promise<void> {
    const context = EngineAudio.getContext()
    const basePath = `/sounds/${carSlug}`

    try {
      const [startup, idle, lowRev, midRev, highRev] = await Promise.all([
        this.fetchAudioBuffer(context, `${basePath}/startup.mp3`),
        this.fetchAudioBuffer(context, `${basePath}/idle.mp3`),
        this.fetchAudioBuffer(context, `${basePath}/low-rev.mp3`),
        this.fetchAudioBuffer(context, `${basePath}/mid-rev.mp3`),
        this.fetchAudioBuffer(context, `${basePath}/high-rev.mp3`),
      ])

      this.buffers = { startup, idle, lowRev, midRev, highRev }
    } catch (err) {
      console.error('Failed to preload audio:', err)
      throw err
    }
  }

  private async fetchAudioBuffer(
    context: AudioContext,
    url: string
  ): Promise<AudioBuffer> {
    const response = await fetch(url)
    const arrayBuffer = await response.arrayBuffer()
    return context.decodeAudioData(arrayBuffer)
  }

  playStartup(volume: number): void {
    if (!this.buffers || !this.buffers.startup) return

    const context = EngineAudio.getContext()
    const source = context.createBufferSource()
    source.buffer = this.buffers.startup

    const gainNode = context.createGain()
    gainNode.gain.value = volume / 100

    source.connect(gainNode)
    gainNode.connect(context.destination)
    source.start(0)
  }

  startEngine(volume: number): void {
    if (!this.buffers || this.isPlaying) return

    const context = EngineAudio.getContext()

    if (context.state === 'suspended') {
      context.resume().catch(err => console.error('Failed to resume context:', err))
    }

    this.masterGain = context.createGain()
    this.masterGain.gain.value = volume / 100
    this.masterGain.connect(context.destination)

    const bufferArray = [
      this.buffers.idle,
      this.buffers.lowRev,
      this.buffers.midRev,
      this.buffers.highRev,
    ]

    bufferArray.forEach(buffer => {
      const source = context.createBufferSource()
      source.buffer = buffer
      source.loop = true

      const gainNode = context.createGain()
      gainNode.gain.value = 0

      source.connect(gainNode)
      gainNode.connect(this.masterGain!)

      source.start(0)
      this.sourceNodes.push(source)
      this.gainNodes.push(gainNode)
    })

    this.isPlaying = true
    this.currentRPM = IDLE_RPM
  }

  stopEngine(): void {
    this.sourceNodes.forEach(node => {
      try {
        node.stop()
      } catch {
        // Node may already be stopped
      }
    })
    this.sourceNodes = []
    this.gainNodes = []
    this.isPlaying = false
    this.currentRPM = IDLE_RPM
  }

  updateAudio(rpm: number, volume: number): void {
    if (!this.isPlaying || !this.masterGain) return

    this.currentRPM = rpm
    const gains = getLayerGains(rpm)

    if (this.gainNodes.length >= 4) {
      this.gainNodes[0].gain.linearRampToValueAtTime(gains.idle, EngineAudio.getContext().currentTime + 0.05)
      this.gainNodes[1].gain.linearRampToValueAtTime(gains.low, EngineAudio.getContext().currentTime + 0.05)
      this.gainNodes[2].gain.linearRampToValueAtTime(gains.mid, EngineAudio.getContext().currentTime + 0.05)
      this.gainNodes[3].gain.linearRampToValueAtTime(gains.high, EngineAudio.getContext().currentTime + 0.05)
    }

    if (this.sourceNodes.length >= 4) {
      const playbackRate = getPlaybackRate(rpm)
      this.sourceNodes.forEach(node => {
        node.playbackRate.linearRampToValueAtTime(playbackRate, EngineAudio.getContext().currentTime + 0.05)
      })
    }

    this.masterGain.gain.linearRampToValueAtTime(volume / 100, EngineAudio.getContext().currentTime + 0.05)
  }

  setVolume(volume: number): void {
    if (this.masterGain) {
      this.masterGain.gain.linearRampToValueAtTime(volume / 100, EngineAudio.getContext().currentTime + 0.05)
    }
  }

  cleanup(): void {
    this.stopEngine()
    this.buffers = null
  }
}
