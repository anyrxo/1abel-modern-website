/**
 * 🎼 REVOLUTIONARY MUSICAL EXPERIENCE SYSTEM FOR 1ABEL
 * Creates flowing, atmospheric soundscapes using all 18 OGG files
 * No jarring transitions - only smooth, immersive musical journeys
 */

interface SoundConfig {
  volume: number
  loop?: boolean
  fadeIn?: number
  fadeOut?: number
  crossfade?: boolean
}

interface LayeredSound {
  name: string
  gainNode: GainNode
  source: AudioBufferSourceNode
  volume: number
}

export class SoundManager {
  private enabled: boolean = false
  private globalVolume: number = 0.4
  private context: AudioContext | null = null
  private initialized: boolean = false
  private audioBuffers: Map<string, AudioBuffer> = new Map()
  private activeLayers: Map<string, LayeredSound> = new Map()
  private ambientLayers: Set<string> = new Set()
  private crossfadeTimeout: NodeJS.Timeout | null = null

  // 🌊 ATMOSPHERIC LAYERS - Always flowing gently in the background
  private readonly AMBIENT_SOUNDS = ['wind', 'room', 'music-highq']
  
  // 🎵 MUSICAL FAMILIES - Grouped for harmonic progressions
  private readonly SOUND_FAMILIES = {
    beeps: ['beeps', 'beeps2', 'beeps3'],
    ui: ['ui-short', 'ui-long', 'click-project'],
    project: ['enter-project', 'leave-project', 'project-text'],
    mystical: ['particles', 'circles', 'shard'],
    identity: ['logo', 'manifesto', 'igloo']
  }

  constructor() {
    if (typeof window !== 'undefined') {
      ['click', 'touchstart', 'keydown'].forEach(event => {
        window.addEventListener(event, () => this.init(), { once: true })
      })
    }
  }

  private async init() {
    if (this.initialized) return
    
    try {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)()
      this.initialized = true
      await this.preloadAllSounds()
    } catch (error) {
      console.warn('Audio context initialization failed:', error)
    }
  }

  private async preloadAllSounds() {
    // 🎼 Load all 18 OGG files for complete musical palette
    const allSoundFiles = [
      'beeps.ogg', 'beeps2.ogg', 'beeps3.ogg',
      'ui-short.ogg', 'ui-long.ogg', 'click-project.ogg',
      'enter-project.ogg', 'leave-project.ogg', 'project-text.ogg',
      'particles.ogg', 'circles.ogg', 'shard.ogg',
      'logo.ogg', 'manifesto.ogg', 'igloo.ogg',
      'wind.ogg', 'room.ogg', 'music-highq.ogg'
    ]

    const loadPromises = allSoundFiles.map(async (file) => {
      try {
        const response = await fetch(`/sounds/${file}`)
        const arrayBuffer = await response.arrayBuffer()
        const audioBuffer = await this.context!.decodeAudioData(arrayBuffer)
        this.audioBuffers.set(file.replace('.ogg', ''), audioBuffer)
      } catch (error) {
        console.warn(`Failed to load sound: ${file}`, error)
      }
    })

    await Promise.all(loadPromises)
    console.log(`🎵 Loaded ${this.audioBuffers.size}/18 sound files`)
  }

  // 🌊 SMOOTH LAYERED SOUND SYSTEM - NO JARRING CUTS
  private async createLayeredSound(soundName: string, config: SoundConfig): Promise<LayeredSound | null> {
    if (!this.context || !this.enabled || !this.audioBuffers.has(soundName)) {
      return null
    }

    const buffer = this.audioBuffers.get(soundName)!
    const source = this.context.createBufferSource()
    const gainNode = this.context.createGain()

    source.buffer = buffer
    source.connect(gainNode)
    gainNode.connect(this.context.destination)
    source.loop = config.loop || false

    const targetVolume = this.globalVolume * config.volume
    
    // 🎵 SMOOTH FADE IN - No sudden jumps
    if (config.fadeIn && config.fadeIn > 0) {
      gainNode.gain.setValueAtTime(0, this.context.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(
        Math.max(targetVolume, 0.001), 
        this.context.currentTime + config.fadeIn
      )
    } else {
      gainNode.gain.setValueAtTime(targetVolume, this.context.currentTime)
    }

    const layeredSound: LayeredSound = {
      name: soundName,
      gainNode,
      source,
      volume: targetVolume
    }

    source.start()
    return layeredSound
  }

  // 🎹 CROSSFADE SYSTEM - Smooth transitions between sounds
  private async crossfadeToSound(fromSound: string, toSound: string, duration: number = 2) {
    if (!this.enabled) return

    const fromLayer = this.activeLayers.get(fromSound)
    
    // Start new sound with fade in
    const newLayer = await this.createLayeredSound(toSound, {
      volume: 0.3,
      fadeIn: duration,
      loop: this.AMBIENT_SOUNDS.includes(toSound)
    })

    if (newLayer) {
      this.activeLayers.set(toSound, newLayer)
    }

    // Fade out old sound
    if (fromLayer && this.context) {
      fromLayer.gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        this.context.currentTime + duration
      )
      
      setTimeout(() => {
        if (fromLayer.source) {
          fromLayer.source.stop()
        }
        this.activeLayers.delete(fromSound)
      }, duration * 1000)
    }
  }

  // 🌟 ATMOSPHERIC FOUNDATION - Gentle ambient layers
  private async startAtmosphericFoundation() {
    if (!this.enabled) return

    // 🌊 Wind - Gentle natural breath
    const windLayer = await this.createLayeredSound('wind', {
      volume: 0.1,
      loop: true,
      fadeIn: 4
    })
    if (windLayer) this.activeLayers.set('wind', windLayer)

    // 🏠 Room tone - Warm spatial presence  
    setTimeout(async () => {
      const roomLayer = await this.createLayeredSound('room', {
        volume: 0.15,
        loop: true,
        fadeIn: 3
      })
      if (roomLayer) this.activeLayers.set('room', roomLayer)
    }, 2000)

    // 🎵 Gentle background music - Musical foundation
    setTimeout(async () => {
      const musicLayer = await this.createLayeredSound('music-highq', {
        volume: 0.12,
        loop: true,
        fadeIn: 5
      })
      if (musicLayer) this.activeLayers.set('music-highq', musicLayer)
    }, 4000)
  }

  // 🎭 MUSICAL PHRASE SYSTEM - Flowing melodies instead of single notes
  private async playMusicalPhrase(family: keyof typeof this.SOUND_FAMILIES, intensity: 'gentle' | 'medium' | 'powerful' = 'medium') {
    if (!this.enabled) return

    const sounds = this.SOUND_FAMILIES[family]
    const volumes = {
      gentle: [0.2, 0.25, 0.3],
      medium: [0.3, 0.35, 0.4], 
      powerful: [0.4, 0.45, 0.5]
    }

    // 🎼 Play sounds as a flowing musical phrase
    for (let i = 0; i < sounds.length; i++) {
      setTimeout(async () => {
        const layer = await this.createLayeredSound(sounds[i], {
          volume: volumes[intensity][i] || 0.3,
          fadeIn: 0.3,
          fadeOut: 0.5
        })

        if (layer) {
          // Auto-cleanup after sound ends
          setTimeout(() => {
            this.activeLayers.delete(sounds[i])
          }, (layer.source.buffer?.duration || 1) * 1000 + 500)
        }
      }, i * 800) // Gentle timing between notes
    }
  }

  // 🌊 FLUID INTERACTION SYSTEM - Smooth responses to user actions

  // ✨ GENTLE UI HARMONICS
  public async playGentleUIFlow() {
    await this.playMusicalPhrase('ui', 'gentle')
  }

  public async playUIClick() {
    const uiSounds = ['ui-short', 'ui-long', 'click-project']
    const randomUI = uiSounds[Math.floor(Math.random() * uiSounds.length)]
    
    const layer = await this.createLayeredSound(randomUI, {
      volume: 0.25,
      fadeIn: 0.1,
      fadeOut: 0.3
    })
    
    if (layer) {
      setTimeout(() => this.activeLayers.delete(randomUI), 2000)
    }
  }

  // 🚪 PROJECT GATEWAY FLOW - Smooth entrance/exit experience
  public async playProjectEnter() {
    // Layer entrance sounds for rich experience
    const enterLayer = await this.createLayeredSound('enter-project', {
      volume: 0.4,
      fadeIn: 0.5
    })
    
    setTimeout(async () => {
      const circlesLayer = await this.createLayeredSound('circles', {
        volume: 0.2,
        fadeIn: 0.3
      })
    }, 300)

    setTimeout(async () => {
      const projectLayer = await this.createLayeredSound('project-text', {
        volume: 0.25,
        fadeIn: 0.4
      })
    }, 600)
  }

  public async playProjectLeave() {
    // Gentle farewell sequence
    const leaveLayer = await this.createLayeredSound('leave-project', {
      volume: 0.3,
      fadeIn: 0.2,
      fadeOut: 1
    })

    setTimeout(async () => {
      const windLayer = this.activeLayers.get('wind')
      if (windLayer && this.context) {
        // Boost wind slightly for gentle closure
        windLayer.gainNode.gain.exponentialRampToValueAtTime(
          0.15,
          this.context.currentTime + 1
        )
      }
    }, 500)
  }

  // 🎵 HARMONIC PROGRESSION SYSTEM
  public async playHarmonicProgression(progression: 'ascending' | 'descending' | 'circular' = 'ascending') {
    const beepSounds = ['beeps', 'beeps2', 'beeps3']
    
    let sequence = beepSounds
    if (progression === 'descending') sequence = [...beepSounds].reverse()
    if (progression === 'circular') sequence = [...beepSounds, 'beeps2']

    for (let i = 0; i < sequence.length; i++) {
      setTimeout(async () => {
        const layer = await this.createLayeredSound(sequence[i], {
          volume: 0.35 - (i * 0.05), // Gradual volume decrease
          fadeIn: 0.2,
          fadeOut: 0.4
        })
      }, i * 600)
    }
  }

  // 🌟 MYSTICAL AMBIENCE BUILDER
  public async buildMysticalAmbience() {
    // Layer mystical sounds to create atmosphere
    const mysticalSounds = ['particles', 'circles', 'shard']
    
    for (let i = 0; i < mysticalSounds.length; i++) {
      setTimeout(async () => {
        const layer = await this.createLayeredSound(mysticalSounds[i], {
          volume: 0.15 + (i * 0.05),
          fadeIn: 1 + (i * 0.5),
          loop: i === 0 // Only particles loop gently
        })
        
        if (layer && i === 0) {
          this.activeLayers.set(mysticalSounds[i], layer)
        }
      }, i * 1000)
    }
  }

  // 👑 LOGO IDENTITY SYMPHONY
  public async playLogoIdentityFlow() {
    // Grand, flowing logo presentation
    const logoLayer = await this.createLayeredSound('logo', {
      volume: 0.5,
      fadeIn: 0.3
    })

    setTimeout(async () => {
      const manifestoLayer = await this.createLayeredSound('manifesto', {
        volume: 0.35,
        fadeIn: 0.4
      })
    }, 600)

    setTimeout(async () => {
      const iglooLayer = await this.createLayeredSound('igloo', {
        volume: 0.3,
        fadeIn: 0.5
      })
    }, 1200)

    // Follow with harmonic progression
    setTimeout(() => {
      this.playHarmonicProgression('ascending')
    }, 2000)
  }

  // 🌊 CONTEXTUAL AMBIENCE SYSTEM
  public async setContextualAmbience(context: 'calm' | 'focused' | 'creative' | 'mystical') {
    // Smoothly transition ambient layers based on context
    
    switch (context) {
      case 'calm':
        await this.crossfadeToSound('music-highq', 'wind', 3)
        setTimeout(() => this.enhanceAmbientLayer('room', 0.2), 1000)
        break
        
      case 'focused':
        await this.crossfadeToSound('wind', 'room', 2)
        setTimeout(() => this.enhanceAmbientLayer('music-highq', 0.1), 1500)
        break
        
      case 'creative':
        this.buildMysticalAmbience()
        setTimeout(() => this.enhanceAmbientLayer('music-highq', 0.18), 2000)
        break
        
      case 'mystical':
        this.buildMysticalAmbience()
        setTimeout(() => this.playHarmonicProgression('circular'), 3000)
        break
    }
  }

  // 🔊 AMBIENT LAYER ENHANCEMENT
  private enhanceAmbientLayer(layerName: string, targetVolume: number) {
    const layer = this.activeLayers.get(layerName)
    if (layer && this.context) {
      layer.gainNode.gain.exponentialRampToValueAtTime(
        targetVolume,
        this.context.currentTime + 2
      )
    }
  }

  // 🎼 WELCOME SYMPHONY - Beautiful introduction when audio first enabled
  public async playWelcomeSymphony() {
    if (!this.enabled) return

    console.log('🎼 Starting Welcome Symphony...')
    
    // 1. Start atmospheric foundation
    await this.startAtmosphericFoundation()
    
    // 2. Gentle UI introduction
    setTimeout(() => this.playGentleUIFlow(), 2000)
    
    // 3. Musical progression
    setTimeout(() => this.playHarmonicProgression('ascending'), 4000)
    
    // 4. Set creative ambience
    setTimeout(() => this.setContextualAmbience('creative'), 6000)
  }

  // 🛑 SMOOTH SHUTDOWN SYSTEM
  public async fadeOutAllLayers(duration: number = 3) {
    if (!this.context) return

    for (const [name, layer] of this.activeLayers) {
      layer.gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        this.context.currentTime + duration
      )
    }

    setTimeout(() => {
      this.activeLayers.forEach(layer => {
        if (layer.source) layer.source.stop()
      })
      this.activeLayers.clear()
    }, duration * 1000)
  }

  // 🎛️ CONTROL METHODS
  public enable() {
    this.enabled = true
    console.log('🎵 Sound system enabled - Welcome to the musical journey')
  }

  public disable() {
    this.enabled = false
    this.fadeOutAllLayers(2)
    console.log('🔇 Sound system disabled')
  }

  public setVolume(volume: number) {
    this.globalVolume = Math.max(0, Math.min(1, volume))
    
    // Adjust all active layers
    for (const layer of this.activeLayers.values()) {
      const newVolume = this.globalVolume * layer.volume
      if (this.context) {
        layer.gainNode.gain.exponentialRampToValueAtTime(
          Math.max(newVolume, 0.001),
          this.context.currentTime + 0.5
        )
      }
    }
  }

  // Legacy compatibility methods (with smooth implementations)
  public playHover = () => this.playUIClick()
  public playClick = () => this.playUIClick()
  public playEnter = () => this.playProjectEnter()
  public playLeave = () => this.playProjectLeave()
  public playSuccess = () => this.playHarmonicProgression('ascending')
  public playLogo = () => this.playLogoIdentityFlow()
  public playParticles = () => this.buildMysticalAmbience()
}

// Global instance
export const soundManager = new SoundManager()

// React hook for smooth musical experience
export function useSound() {
  return {
    // 🌊 Smooth UI interactions
    playHover: () => soundManager.playUIClick(),
    playClick: () => soundManager.playUIClick(),
    playGentleFlow: () => soundManager.playGentleUIFlow(),
    
    // 🚪 Project navigation
    playEnter: () => soundManager.playProjectEnter(),
    playLeave: () => soundManager.playProjectLeave(),
    
    // 🎵 Musical progressions
    playHarmonicProgression: (type?: 'ascending' | 'descending' | 'circular') => 
      soundManager.playHarmonicProgression(type),
    
    // 👑 Identity sounds
    playLogo: () => soundManager.playLogoIdentityFlow(),
    
    // 🌟 Mystical atmosphere
    playMystical: () => soundManager.buildMysticalAmbience(),
    
    // 🌊 Contextual ambiences
    setAmbience: (context: 'calm' | 'focused' | 'creative' | 'mystical') =>
      soundManager.setContextualAmbience(context),
    
    // 🎼 Welcome experience
    playWelcomeSymphony: () => soundManager.playWelcomeSymphony(),
    
    // 🎛️ Controls
    enable: () => soundManager.enable(),
    disable: () => soundManager.disable(),
    setVolume: (volume: number) => soundManager.setVolume(volume),
    fadeOut: (duration?: number) => soundManager.fadeOutAllLayers(duration)
  }
}

// Enhanced interactive sound initialization
export function initInteractiveSounds() {
  if (typeof window === 'undefined') return

  let lastInteractionTime = 0
  const INTERACTION_COOLDOWN = 300 // Prevent sound spam

  const addSmoothInteraction = (element: HTMLElement, soundType: string) => {
    const handleInteraction = async (event: Event) => {
      const now = Date.now()
      if (now - lastInteractionTime < INTERACTION_COOLDOWN) return
      lastInteractionTime = now

      switch (soundType) {
        case 'logo':
          soundManager.playLogoIdentityFlow()
          break
        case 'enter':
          soundManager.playProjectEnter()
          break
        case 'mystical':
          soundManager.buildMysticalAmbience()
          break
        default:
          soundManager.playUIClick()
      }
    }

    element.addEventListener('mouseenter', handleInteraction)
    element.addEventListener('click', handleInteraction)
    
    return () => {
      element.removeEventListener('mouseenter', handleInteraction)
      element.removeEventListener('click', handleInteraction)
    }
  }

  // Apply smooth interactions to elements
  const setupSmoothSounds = () => {
    document.querySelectorAll('[data-sound]').forEach(element => {
      if (element instanceof HTMLElement && !element.dataset.soundSetup) {
        const soundType = element.dataset.sound || 'default'
        addSmoothInteraction(element, soundType)
        element.dataset.soundSetup = 'true'
      }
    })
  }

  setupSmoothSounds()
  
  // Monitor for new elements
  const observer = new MutationObserver(setupSmoothSounds)
  observer.observe(document.body, { childList: true, subtree: true })
  
  return () => observer.disconnect()
}