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
  private atmosphereStarted: boolean = false
  private persistentAtmosphere: boolean = true  // NEW: Keep atmosphere across pages
  private lastInteractionTime: number = 0      // NEW: Track user interaction

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

    // Track user interaction for atmospheric persistence
    if (!this.AMBIENT_SOUNDS.includes(soundName)) {
      this.lastInteractionTime = Date.now()
    }

    // Stop existing instance of this sound (except for atmospheric sounds during page transitions)
    const existingSource = this.currentSources.get(soundName)
    if (existingSource && (!this.AMBIENT_SOUNDS.includes(soundName) || !this.persistentAtmosphere)) {
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

  // Typing sound specifically for text animations
  public async playTypingSound() {
    // Use project-text sound for typing effect
    await this.playSound('project-text', { volume: 0.2 })
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

  // 🌊 ATMOSPHERIC LAYERS - PERSISTENT ACROSS PAGES
  public async startAtmosphere() {
    if (!this.enabled) return
    
    // Only start if not already started or if sounds have stopped
    const hasActiveAtmosphere = this.AMBIENT_SOUNDS.some(soundName => 
      this.currentSources.has(soundName)
    )
    
    if (hasActiveAtmosphere && this.atmosphereStarted) {
      console.log('🌊 Atmosphere already active')
      return
    }

    console.log('🌊 Starting atmospheric layers...')
    this.atmosphereStarted = true
    
    // Wind - very gentle background (persistent)
    await this.playSound('wind', { volume: 0.08, loop: true, fadeIn: 3 })
    
    // Room tone - warm presence (persistent)
    setTimeout(async () => {
      await this.playSound('room', { volume: 0.12, loop: true, fadeIn: 2 })
    }, 1000)
    
    // Background music - subtle (persistent)
    setTimeout(async () => {
      this.ambientMusic = await this.playSound('music-highq', { volume: 0.10, loop: true, fadeIn: 4 })
    }, 2000)
    
    // Auto-restart atmosphere if it gets interrupted (page changes, etc.)
    this.setupAtmosphereWatchdog()
  }

  private setupAtmosphereWatchdog() {
    if (!this.persistentAtmosphere) return
    
    const watchdog = setInterval(() => {
      if (!this.enabled) {
        clearInterval(watchdog)
        return
      }
      
      // Check if atmosphere sounds are still playing
      const hasActiveAtmosphere = this.AMBIENT_SOUNDS.some(soundName => 
        this.currentSources.has(soundName)
      )
      
      // If no atmosphere and user was recently active, restart it
      if (!hasActiveAtmosphere && this.atmosphereStarted && (Date.now() - this.lastInteractionTime < 30000)) {
        console.log('🌊 Atmosphere watchdog: Restarting atmosphere')
        this.atmosphereStarted = false // Reset flag
        this.startAtmosphere()
      }
    }, 5000) // Check every 5 seconds
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
    
    this.atmosphereStarted = false
  }

  // 🎼 WELCOME SEQUENCE
  public async playWelcomeSequence() {
    if (!this.enabled) return
    
    console.log('🎼 Playing welcome sequence...')
    
    // Just start atmospheric layers, no beeps or other sounds
    setTimeout(async () => await this.startAtmosphere(), 500)
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

  // 🎵 ENHANCED BUTTON INTERACTIONS
  public async playButtonHover() {
    // Subtle hover sound - lighter than click
    await this.playSound('ui-short', { volume: 0.15, fadeIn: 0.05 })
  }

  public async playButtonClick() {
    // More pronounced click sound
    await this.playSound('click-project', { volume: 0.25, fadeIn: 0.05 })
  }

  public async playShimmerButtonHover() {
    // Special shimmer button hover - use shard for magical effect
    await this.playSound('shard', { volume: 0.12, fadeIn: 0.1 })
  }

  public async playShimmerButtonClick() {
    // Shimmer button click - use circles for magical effect
    await this.playSound('circles', { volume: 0.2, fadeIn: 0.1 })
  }

  public async playLinkHover() {
    // Very subtle link hover
    await this.playSound('ui-long', { volume: 0.1, fadeIn: 0.05 })
  }

  public async playFormInteraction() {
    // Form field focus/input sounds
    await this.playSound('project-text', { volume: 0.15 })
  }

  // Legacy compatibility
  public playHover = () => this.playButtonHover()
  public playClick = () => this.playButtonClick()
  public playSuccess = () => this.playBeepSequence()
}

// Global instance
export const soundManager = new SoundManager()

// React hook
export function useSound() {
  return {
    // Basic interactions
    playHover: () => soundManager.playButtonHover(),
    playClick: () => soundManager.playButtonClick(),
    playEnter: () => soundManager.playEnter(),
    playLeave: () => soundManager.playLeave(),
    playUISound: () => soundManager.playUISound(),
    playTypingSound: () => soundManager.playTypingSound(),
    
    // Enhanced button interactions
    playButtonHover: () => soundManager.playButtonHover(),
    playButtonClick: () => soundManager.playButtonClick(),
    playShimmerButtonHover: () => soundManager.playShimmerButtonHover(),
    playShimmerButtonClick: () => soundManager.playShimmerButtonClick(),
    playLinkHover: () => soundManager.playLinkHover(),
    playFormInteraction: () => soundManager.playFormInteraction(),
    
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
  
  // We don't auto-add sounds to all elements anymore
  // to prevent random typing sounds on scroll
  return () => {}
}