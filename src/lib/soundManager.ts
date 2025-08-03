/**
 * 🎵 SIMPLIFIED WORKING SOUND SYSTEM FOR 1ABEL
 * All 18 OGG files - NO particles sound, actually works, global across pages
 */

interface SoundConfig {
  volume: number
  loop?: boolean
  fadeIn?: number
  fadeOut?: number
}

export class SoundManager {
  private enabled: boolean = false
  private globalVolume: number = 0.4
  private context: AudioContext | null = null
  private initialized: boolean = false
  private audioBuffers: Map<string, AudioBuffer> = new Map()
  private currentSources: Map<string, AudioBufferSourceNode> = new Map()
  private ambientMusic: AudioBufferSourceNode | null = null

  // 🎵 ALL 18 FILES (excluding particles from mystical sounds)
  private readonly ALL_SOUNDS = [
    'beeps', 'beeps2', 'beeps3',
    'ui-short', 'ui-long', 'click-project', 
    'enter-project', 'leave-project', 'project-text',
    'circles', 'shard', // REMOVED particles from here
    'logo', 'manifesto', 'igloo',
    'wind', 'room', 'music-highq'
  ]

  // 🌊 ATMOSPHERIC SOUNDS (gentle background)
  private readonly AMBIENT_SOUNDS = ['wind', 'room', 'music-highq']

  constructor() {
    if (typeof window !== 'undefined') {
      // Initialize on any user interaction
      const initOnInteraction = () => {
        this.init()
        document.removeEventListener('click', initOnInteraction)
        document.removeEventListener('keydown', initOnInteraction)
      }
      
      document.addEventListener('click', initOnInteraction)
      document.addEventListener('keydown', initOnInteraction)
    }
  }

  private async init() {
    if (this.initialized) return
    
    try {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)()
      this.initialized = true
      await this.preloadAllSounds()
      console.log('🎵 Sound system initialized successfully')
    } catch (error) {
      console.warn('Audio context initialization failed:', error)
    }
  }

  private async preloadAllSounds() {
    console.log('🎵 Loading all 18 sound files...')
    
    const loadPromises = this.ALL_SOUNDS.map(async (soundName) => {
      try {
        const response = await fetch(`/sounds/${soundName}.ogg`)
        if (!response.ok) {
          console.warn(`Failed to fetch ${soundName}.ogg: ${response.status}`)
          return
        }
        
        const arrayBuffer = await response.arrayBuffer()
        const audioBuffer = await this.context!.decodeAudioData(arrayBuffer)
        this.audioBuffers.set(soundName, audioBuffer)
        console.log(`✅ Loaded: ${soundName}.ogg`)
      } catch (error) {
        console.warn(`❌ Failed to load ${soundName}.ogg:`, error)
      }
    })

    await Promise.all(loadPromises)
    console.log(`🎵 Successfully loaded ${this.audioBuffers.size}/${this.ALL_SOUNDS.length} sound files`)
  }

  private async playSound(soundName: string, config: SoundConfig = { volume: 1 }): Promise<AudioBufferSourceNode | null> {
    if (!this.context || !this.enabled || !this.audioBuffers.has(soundName)) {
      console.log(`🔇 Cannot play ${soundName}: enabled=${this.enabled}, hasBuffer=${this.audioBuffers.has(soundName)}`)
      return null
    }

    // Stop existing instance of this sound
    const existingSource = this.currentSources.get(soundName)
    if (existingSource) {
      try {
        existingSource.stop()
      } catch (e) {
        // Ignore - source might already be stopped
      }
      this.currentSources.delete(soundName)
    }

    const buffer = this.audioBuffers.get(soundName)!
    const source = this.context.createBufferSource()
    const gainNode = this.context.createGain()

    source.buffer = buffer
    source.connect(gainNode)
    gainNode.connect(this.context.destination)
    source.loop = config.loop || false

    const volume = this.globalVolume * config.volume

    // Smooth fade in
    if (config.fadeIn && config.fadeIn > 0) {
      gainNode.gain.setValueAtTime(0, this.context.currentTime)
      gainNode.gain.linearRampToValueAtTime(volume, this.context.currentTime + config.fadeIn)
    } else {
      gainNode.gain.setValueAtTime(volume, this.context.currentTime)
    }

    // Smooth fade out if specified
    if (config.fadeOut && config.fadeOut > 0) {
      const fadeStartTime = this.context.currentTime + buffer.duration - config.fadeOut
      gainNode.gain.setValueAtTime(volume, fadeStartTime)
      gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime + buffer.duration)
    }

    this.currentSources.set(soundName, source)

    source.onended = () => {
      this.currentSources.delete(soundName)
    }

    source.start()
    console.log(`🎵 Playing: ${soundName}`)
    return source
  }

  // 🎵 SIMPLE WORKING METHODS

  // UI Sounds
  public async playUISound() {
    const uiSounds = ['ui-short', 'ui-long', 'click-project']
    const randomSound = uiSounds[Math.floor(Math.random() * uiSounds.length)]
    await this.playSound(randomSound, { volume: 0.3, fadeIn: 0.1 })
  }

  // Navigation sounds
  public async playEnter() {
    await this.playSound('enter-project', { volume: 0.4, fadeIn: 0.3 })
  }

  public async playLeave() {
    await this.playSound('leave-project', { volume: 0.3, fadeOut: 0.5 })
  }

  // Logo/Identity sounds
  public async playLogo() {
    await this.playSound('logo', { volume: 0.5, fadeIn: 0.2 })
  }

  public async playManifesto() {
    await this.playSound('manifesto', { volume: 0.4, fadeIn: 0.3 })
  }

  public async playIgloo() {
    await this.playSound('igloo', { volume: 0.3, fadeIn: 0.2 })
  }

  // Musical sequences
  public async playBeepSequence() {
    await this.playSound('beeps', { volume: 0.35 })
    setTimeout(async () => await this.playSound('beeps2', { volume: 0.35 }), 600)
    setTimeout(async () => await this.playSound('beeps3', { volume: 0.35 }), 1200)
  }

  // Mystical sounds (NO PARTICLES!)
  public async playMystical() {
    await this.playSound('circles', { volume: 0.25, fadeIn: 0.5 })
    setTimeout(async () => await this.playSound('shard', { volume: 0.3, fadeIn: 0.3 }), 500)
  }

  // 🌊 ATMOSPHERIC LAYERS
  public async startAtmosphere() {
    if (!this.enabled) return

    console.log('🌊 Starting atmospheric layers...')
    
    // Wind - very gentle background
    await this.playSound('wind', { volume: 0.08, loop: true, fadeIn: 3 })
    
    // Room tone - warm presence
    setTimeout(async () => {
      await this.playSound('room', { volume: 0.12, loop: true, fadeIn: 2 })
    }, 1000)
    
    // Background music - subtle
    setTimeout(async () => {
      this.ambientMusic = await this.playSound('music-highq', { volume: 0.10, loop: true, fadeIn: 4 })
    }, 2000)
  }

  public stopAtmosphere() {
    this.AMBIENT_SOUNDS.forEach(soundName => {
      const source = this.currentSources.get(soundName)
      if (source) {
        try {
          source.stop()
        } catch (e) {
          // Ignore
        }
        this.currentSources.delete(soundName)
      }
    })
    
    if (this.ambientMusic) {
      try {
        this.ambientMusic.stop()
      } catch (e) {
        // Ignore
      }
      this.ambientMusic = null
    }
  }

  // 🎼 WELCOME SEQUENCE
  public async playWelcomeSequence() {
    if (!this.enabled) return
    
    console.log('🎼 Playing welcome sequence...')
    
    // Start with gentle UI sound
    await this.playUISound()
    
    // Start atmospheric layers
    setTimeout(async () => await this.startAtmosphere(), 500)
    
    // Play a gentle musical sequence
    setTimeout(async () => await this.playBeepSequence(), 2000)
    
    // Add some mystical elements
    setTimeout(async () => await this.playMystical(), 4000)
  }

  // 🎛️ CONTROLS
  public enable() {
    this.enabled = true
    console.log('🎵 Sound system ENABLED')
    
    // Auto-start welcome sequence when enabled
    setTimeout(() => this.playWelcomeSequence(), 300)
  }

  public disable() {
    this.enabled = false
    this.stopAllSounds()
    console.log('🔇 Sound system DISABLED')
  }

  public setVolume(volume: number) {
    this.globalVolume = Math.max(0, Math.min(1, volume))
    console.log(`🔊 Volume set to ${Math.round(this.globalVolume * 100)}%`)
  }

  public stopAllSounds() {
    this.currentSources.forEach((source, name) => {
      try {
        source.stop()
      } catch (e) {
        // Ignore - source might already be stopped
      }
    })
    this.currentSources.clear()
    
    if (this.ambientMusic) {
      try {
        this.ambientMusic.stop()
      } catch (e) {
        // Ignore
      }
      this.ambientMusic = null
    }
  }

  // Legacy compatibility
  public playHover = () => this.playUISound()
  public playClick = () => this.playUISound()
  public playSuccess = () => this.playBeepSequence()
}

// Global instance
export const soundManager = new SoundManager()

// React hook
export function useSound() {
  return {
    // Basic interactions
    playHover: () => soundManager.playUISound(),
    playClick: () => soundManager.playUISound(),
    playEnter: () => soundManager.playEnter(),
    playLeave: () => soundManager.playLeave(),
    
    // Identity sounds
    playLogo: () => soundManager.playLogo(),
    playManifesto: () => soundManager.playManifesto(),
    playIgloo: () => soundManager.playIgloo(),
    
    // Musical elements
    playBeeps: () => soundManager.playBeepSequence(),
    playMystical: () => soundManager.playMystical(),
    
    // Atmosphere
    startAtmosphere: () => soundManager.startAtmosphere(),
    stopAtmosphere: () => soundManager.stopAtmosphere(),
    
    // Welcome
    playWelcome: () => soundManager.playWelcomeSequence(),
    
    // Controls
    enable: () => soundManager.enable(),
    disable: () => soundManager.disable(),
    setVolume: (volume: number) => soundManager.setVolume(volume),
    stopAll: () => soundManager.stopAllSounds()
  }
}

// Global sound initialization
export function initGlobalSounds() {
  if (typeof window === 'undefined') return

  console.log('🎵 Initializing global sound system...')
  
  // Make sound manager globally available
  ;(window as any).soundManager = soundManager
  
  // Auto-add hover sounds to interactive elements
  const addHoverSounds = () => {
    const buttons = document.querySelectorAll('button, a[href], [role="button"]')
    buttons.forEach(button => {
      if (button instanceof HTMLElement && !button.dataset.soundAdded) {
        button.addEventListener('mouseenter', () => soundManager.playUISound())
        button.addEventListener('click', () => soundManager.playUISound())
        button.dataset.soundAdded = 'true'
      }
    })
  }

  // Initial setup
  addHoverSounds()
  
  // Re-run when DOM changes
  const observer = new MutationObserver(addHoverSounds)
  observer.observe(document.body, { childList: true, subtree: true })
  
  return () => observer.disconnect()
}