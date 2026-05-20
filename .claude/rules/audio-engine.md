# Audio Engine Rules

## Core Principle

Web Audio API is the ONLY audio solution. No Howler.js, no Tone.js, no HTML5 `<audio>` tags.
The audio engine is the heart of this product — build it right.

---

## AudioContext Rules

- Create ONE `AudioContext` per session — never recreate it
- Only create on first user gesture (browser policy — autoplay is blocked)
- Always check state before playing: `suspended`, `running`, `closed`
- Suspend when user leaves the car page

```typescript
// ✅ Good — create once, reuse
class EngineAudio {
  private static context: AudioContext | null = null

  static getContext(): AudioContext {
    if (!this.context) {
      this.context = new AudioContext()
    }
    return this.context
  }
}

// ❌ Bad — creates new context every call
function playSound() {
  const ctx = new AudioContext()
  ...
}
```

---

## 4 Audio Layers

Every car has 4 looping audio layers that crossfade based on RPM:

| Layer | File | RPM Range | Character |
|---|---|---|---|
| Idle | `idle.mp3` | 600–900 | Burbling low rumble |
| Low | `low-rev.mp3` | 1,000–3,000 | Throaty growl |
| Mid | `mid-rev.mp3` | 3,000–6,000 | Aggressive wail |
| High | `high-rev.mp3` | 6,000–9,000 | Screaming shriek |

Plus one-shot:
| Startup | `startup.mp3` | On ignition | Engine cranking to life |

---

## Crossfade Logic

Calculate gain (volume) per layer based on current RPM.
All transitions use `gainNode.gain.linearRampToValueAtTime()` — never instant jumps.

```typescript
function getLayerGains(rpm: number): AudioGains {
  const MAX = 9000

  return {
    idle: rpm < 1500
      ? 1.0
      : Math.max(0, 1 - (rpm - 1500) / 1500),

    low: rpm < 1000
      ? 0
      : rpm < 2500
        ? (rpm - 1000) / 1500
        : rpm < 4000
          ? 1.0
          : Math.max(0, 1 - (rpm - 4000) / 1500),

    mid: rpm < 3000
      ? 0
      : rpm < 4500
        ? (rpm - 3000) / 1500
        : rpm < 6500
          ? 1.0
          : Math.max(0, 1 - (rpm - 6500) / 1500),

    high: rpm < 5000
      ? 0
      : Math.min(1, (rpm - 5000) / 2000),
  }
}
```

---

## RPM Physics

RPM must feel natural — not robotic. Use these formulas exactly.

```typescript
const IDLE_RPM = 800
const MAX_RPM = 9000   // Ferrari 458 redline
const RISE_FACTOR = 0.08
const FALL_FACTOR = 0.06

// Called every ~16ms (requestAnimationFrame)
function updateRPM(currentRPM: number, isAccelerating: boolean): number {
  if (isAccelerating) {
    // Fast rise, slows near redline
    return Math.min(
      currentRPM + (MAX_RPM - currentRPM) * RISE_FACTOR,
      MAX_RPM
    )
  } else {
    // Natural deceleration with inertia
    return Math.max(
      currentRPM * (1 - FALL_FACTOR),
      IDLE_RPM
    )
  }
}
```

---

## Pitch Variation

Subtle pitch shift via `playbackRate` makes the engine feel alive.

```typescript
// Map RPM to playback rate (subtle — not dramatic)
function getPlaybackRate(rpm: number, maxRPM: number): number {
  const base = 1.0
  const range = 0.3  // max 30% pitch shift
  return base + (rpm / maxRPM) * range
}

// Apply to each source node
sourceNode.playbackRate.linearRampToValueAtTime(
  getPlaybackRate(rpm, MAX_RPM),
  audioContext.currentTime + 0.05
)
```

---

## Audio File Requirements

| Property | Requirement |
|---|---|
| Format | MP3 (primary), WebM/Opus (fallback) |
| Sample rate | 44.1 kHz |
| Max file size | 500 KB each |
| Loop-friendly | Must have clean loop points (no click/pop) |
| Recorded clean | No background noise, music, or reverb |

---

## Preloading

Preload all audio files when the car detail page loads. Never lazy-load individual sounds.

```typescript
async function preloadAudio(config: AudioConfig): Promise<AudioBuffers> {
  const context = EngineAudio.getContext()

  const [startup, idle, lowRev, midRev, highRev] = await Promise.all([
    fetchAudioBuffer(context, config.startup),
    fetchAudioBuffer(context, config.idle),
    fetchAudioBuffer(context, config.lowRev),
    fetchAudioBuffer(context, config.midRev),
    fetchAudioBuffer(context, config.highRev),
  ])

  return { startup, idle, lowRev, midRev, highRev }
}
```

---

## Error Handling

Web Audio API is fragile across browsers. Always wrap in try/catch.

```typescript
// ✅ Always resume before playing
async function resumeAndPlay() {
  const ctx = EngineAudio.getContext()
  try {
    if (ctx.state === 'suspended') {
      await ctx.resume()
    }
    // safe to play now
  } catch (err) {
    console.error('Audio context failed to resume:', err)
    // show fallback UI
  }
}

// ✅ Graceful fallback if audio unsupported
if (typeof AudioContext === 'undefined') {
  // Show "Audio not supported" message
  // Don't crash the page
}
```

---

## useAudioEngine Hook

All audio logic lives in this custom hook — never directly in components.

```typescript
// src/hooks/useAudioEngine.ts
export function useAudioEngine(config: AudioConfig) {
  const { rpm, isAccelerating, isEngineOn } = useAudioStore()

  // Returns:
  return {
    startEngine: () => void,
    stopEngine: () => void,
    isLoaded: boolean,
    isSupported: boolean,
    error: string | null,
  }
}
```

---

## Cleanup

Always clean up audio nodes when component unmounts.

```typescript
useEffect(() => {
  return () => {
    sourceNodes.forEach(node => {
      node.stop()
      node.disconnect()
    })
    gainNodes.forEach(node => node.disconnect())
  }
}, [])
```