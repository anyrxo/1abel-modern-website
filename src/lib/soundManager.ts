/**
 * Enhanced Sound Manager for 1ABEL - Beautiful OGG Audio System
 * Uses professional OGG audio files for immersive experience
 */

interface SoundConfig {
  volume: number
  loop?: boolean
  fadeIn?: number
  fadeOut?: number
}

export class SoundManager {
  private enabled: boolean = false  // Start muted by default
  private globalVolume: number = 0.4
  private context: AudioContext | null = null
  private initialized: boolean = false
  private audioBuffers: Map<string, AudioBuffer> = new Map()
  private currentlyPlaying: Map<string, AudioBufferSourceNode> = new Map()
  private backgroundMusic: AudioBufferSourceNode | null = null

  constructor() {
    // Initialize on first user interaction
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
      
      // Preload key audio files
      await this.preloadSounds()
    } catch (error) {
      console.warn('Audio context initialization failed:', error)
    }
  }

  private async preloadSounds() {
    const soundFiles = [
      'ui-short.ogg',
      'ui-long.ogg', 
      'click-project.ogg',
      'enter-project.ogg',
      'leave-project.ogg',
      'logo.ogg',
      'beeps.ogg',
      'beeps2.ogg',
      'beeps3.ogg',
      'particles.ogg',
      'shard.ogg',
      'wind.ogg',
      'circles.ogg',
      'manifesto.ogg',
      'music-highq.ogg',
      'room.ogg'
    ]

    for (const file of soundFiles) {
      try {
        const response = await fetch(`/sounds/${file}`)
        const arrayBuffer = await response.arrayBuffer()
        const audioBuffer = await this.context!.decodeAudioData(arrayBuffer)
        this.audioBuffers.set(file.replace('.ogg', ''), audioBuffer)
      } catch (error) {
        console.warn(`Failed to load sound: ${file}`, error)
      }
    }
  }

  private async playSound(soundName: string, config: SoundConfig = { volume: 1 }) {
    if (!this.context || !this.enabled || !this.audioBuffers.has(soundName)) {
      console.log(`Sound ${soundName} not played: enabled=${this.enabled}, context=${!!this.context}, hasBuffer=${this.audioBuffers.has(soundName)}`)
      return
    }

    const buffer = this.audioBuffers.get(soundName)!
    const source = this.context.createBufferSource()
    const gainNode = this.context.createGain()

    source.buffer = buffer
    source.connect(gainNode)
    gainNode.connect(this.context.destination)

    // Set volume
    const volume = this.globalVolume * config.volume
    gainNode.gain.setValueAtTime(volume, this.context.currentTime)

    // Handle fade in/out
    if (config.fadeIn) {
      gainNode.gain.setValueAtTime(0, this.context.currentTime)
      gainNode.gain.linearRampToValueAtTime(volume, this.context.currentTime + config.fadeIn)
    }

    if (config.fadeOut) {
      gainNode.gain.setValueAtTime(volume, this.context.currentTime + buffer.duration - config.fadeOut)
      gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime + buffer.duration)
    }

    // Handle looping
    source.loop = config.loop || false

    // Store reference for potential stopping
    this.currentlyPlaying.set(soundName, source)

    // Clean up when finished
    source.onended = () => {
      this.currentlyPlaying.delete(soundName)
    }

    source.start()
    return source
  }

  // 🎼 DIVINE MUSICAL COMPOSITION SYSTEM
  // Each sound is a note in the grand symphony of interaction
  
  // ✨ Celestial UI Harmonics - Gentle, like touching stardust
  public playHover() {
    this.playSound('ui-short', { volume: 0.25, fadeIn: 0.1 })
  }

  public playClick() {
    this.playSound('click-project', { volume: 0.4, fadeIn: 0.05 })
  }

  // 🎵 Triumph & Success - Rising crescendo of achievement
  public playSuccess() {
    this.playSound('beeps', { volume: 0.35, fadeIn: 0.1 })
  }

  // 🚪 Gateway Sounds - Entering & leaving sacred spaces
  public playEnter() {
    this.playSound('enter-project', { volume: 0.5, fadeIn: 0.3 })
  }

  public playLeave() {
    this.playSound('leave-project', { volume: 0.3, fadeOut: 0.5 })
  }

  // 👑 Logo Symphony - The divine identity manifests
  public playLogo() {
    this.playSound('logo', { volume: 0.6, fadeIn: 0.2 })
  }

  // ✨ Particle Magic - Cosmic dust dancing in digital wind
  public playParticles() {
    this.playSound('particles', { volume: 0.25, fadeIn: 0.2, fadeOut: 0.3 })
  }

  // 💎 Crystal Shards - Sharp, crystalline perfection
  public playShard() {
    this.playSound('shard', { volume: 0.45, fadeIn: 0.05 })
  }

  // 🎼 Beep Variations - Three-note melody system
  public playBeepMelody(note: 'first' | 'second' | 'third' = 'first') {
    const soundName = note === 'first' ? 'beeps' : note === 'second' ? 'beeps2' : 'beeps3'
    this.playSound(soundName, { volume: 0.4, fadeIn: 0.1 })
  }

  // 🌪️ Wind Symphony - Nature's breath in digital form
  public playWind() {
    this.playSound('wind', { volume: 0.15, fadeIn: 2, fadeOut: 1 })
  }

  // ⭕ Circles of Power - Geometric harmony
  public playCircles() {
    this.playSound('circles', { volume: 0.35, fadeIn: 0.15 })
  }

  // 📜 Manifesto of Purpose - The voice of destiny
  public playManifesto() {
    this.playSound('manifesto', { volume: 0.45, fadeIn: 0.3 })
  }

  // 🏔️ Igloo Depths - Ancient wisdom calls
  public playIgloo() {
    this.playSound('igloo', { volume: 0.3, fadeIn: 0.2 })
  }

  // 📝 Project Text - The written word comes alive
  public playProjectText() {
    this.playSound('project-text', { volume: 0.4, fadeIn: 0.25 })
  }

  // 🎭 Intelligent Musical Variations
  public playHarmonicBeep() {
    // Musical progression through the three beep notes
    const progression = ['first', 'second', 'third'] as const
    const note = progression[Math.floor(Math.random() * 3)]
    this.playBeepMelody(note)
  }

  public playDelicateUI() {
    // Alternates between two UI sounds for variety
    const sounds = ['ui-short', 'ui-long'] as const
    const sound = sounds[Math.floor(Math.random() * 2)]
    this.playSound(sound, { volume: 0.25, fadeIn: 0.1 })
  }

  // 🎹 Musical Chords - Combination sounds for special moments
  public playMysticalChord() {
    // Plays circles + particles together for magical moments
    this.playCircles()
    setTimeout(() => this.playParticles(), 150)
  }

  public playTriumphantChord() {
    // Logo + manifesto for grand moments
    this.playLogo()
    setTimeout(() => this.playManifesto(), 300)
  }

  // 🌟 Contextual Sound Selection - AI-like intelligence
  public playContextualSound(context: 'navigation' | 'interaction' | 'achievement' | 'mystical') {
    switch (context) {
      case 'navigation':
        Math.random() > 0.5 ? this.playProjectText() : this.playDelicateUI()
        break
      case 'interaction':
        Math.random() > 0.7 ? this.playMysticalChord() : this.playCircles()
        break
      case 'achievement':
        this.playTriumphantChord()
        break
      case 'mystical':
        this.playIgloo()
        setTimeout(() => this.playParticles(), 200)
        break
    }
  }

  // Background music
  public async startBackgroundMusic() {
    if (this.backgroundMusic) return
    
    this.backgroundMusic = await this.playSound('music-highq', { 
      volume: 0.15, 
      loop: true, 
      fadeIn: 3 
    }) || null
  }

  public stopBackgroundMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.stop()
      this.backgroundMusic = null
    }
  }

  public playRoomAmbient() {
    this.playSound('room', { volume: 0.2, loop: false, fadeIn: 1 })
  }

  public stopSound(soundName: string) {
    const source = this.currentlyPlaying.get(soundName)
    if (source) {
      source.stop()
      this.currentlyPlaying.delete(soundName)
    }
  }

  public stopAllSounds() {
    this.currentlyPlaying.forEach((source, name) => {
      source.stop()
    })
    this.currentlyPlaying.clear()
    
    if (this.backgroundMusic) {
      this.backgroundMusic.stop()
      this.backgroundMusic = null
    }
  }

  public enable() {
    this.enabled = true
    console.log('SoundManager enabled')
  }

  public disable() {
    this.enabled = false
    this.stopAllSounds()
    console.log('SoundManager disabled')
  }

  public setVolume(volume: number) {
    this.globalVolume = Math.max(0, Math.min(1, volume))
  }
}

// Global instance
export const soundManager = new SoundManager()

// React hook for using enhanced sound manager
export function useSound() {
  return {
    // Basic UI sounds
    playHover: () => soundManager.playHover(),
    playClick: () => soundManager.playClick(),
    playSuccess: () => soundManager.playSuccess(),
    
    // 🎼 Divine Musical Composition
    playEnter: () => soundManager.playEnter(),
    playLeave: () => soundManager.playLeave(),
    playLogo: () => soundManager.playLogo(),
    playParticles: () => soundManager.playParticles(),
    playShard: () => soundManager.playShard(),
    playWind: () => soundManager.playWind(),
    playCircles: () => soundManager.playCircles(),
    playManifesto: () => soundManager.playManifesto(),
    playIgloo: () => soundManager.playIgloo(),
    playProjectText: () => soundManager.playProjectText(),
    
    // 🎵 Musical Harmonies & Melodies
    playBeepMelody: (note?: 'first' | 'second' | 'third') => soundManager.playBeepMelody(note),
    playHarmonicBeep: () => soundManager.playHarmonicBeep(),
    playDelicateUI: () => soundManager.playDelicateUI(),
    
    // 🎹 Musical Chords & Combinations
    playMysticalChord: () => soundManager.playMysticalChord(),
    playTriumphantChord: () => soundManager.playTriumphantChord(),
    
    // 🌟 Contextual Intelligence
    playContextualSound: (context: 'navigation' | 'interaction' | 'achievement' | 'mystical') => 
      soundManager.playContextualSound(context),
    
    // Background sounds
    startBackgroundMusic: () => soundManager.startBackgroundMusic(),
    stopBackgroundMusic: () => soundManager.stopBackgroundMusic(),
    playRoomAmbient: () => soundManager.playRoomAmbient(),
    
    // Controls
    stopSound: (name: string) => soundManager.stopSound(name),
    stopAllSounds: () => soundManager.stopAllSounds(),
    enable: () => soundManager.enable(),
    disable: () => soundManager.disable(),
    setVolume: (volume: number) => soundManager.setVolume(volume)
  }
}

// Add enhanced hover sounds to elements
export function addHoverSound(element: HTMLElement, soundType: 'default' | 'enter' | 'logo' | 'shard' = 'default') {
  const handleMouseEnter = () => {
    switch (soundType) {
      case 'enter':
        soundManager.playEnter()
        break
      case 'logo':
        soundManager.playLogo()
        break
      case 'shard':
        soundManager.playShard()
        break
      default:
        soundManager.playHover()
    }
  }
  
  const handleClick = () => soundManager.playClick()
  const handleMouseLeave = () => {
    if (soundType === 'enter') {
      soundManager.playLeave()
    }
  }

  element.addEventListener('mouseenter', handleMouseEnter)
  element.addEventListener('click', handleClick)
  element.addEventListener('mouseleave', handleMouseLeave)

  // Return cleanup function
  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter)
    element.removeEventListener('click', handleClick)
    element.removeEventListener('mouseleave', handleMouseLeave)
  }
}

// Initialize interactive sounds for buttons with enhanced audio
export function initInteractiveSounds() {
  if (typeof window === 'undefined') return

  // Add sounds to different element types
  const addSoundsToButtons = () => {
    // Logo elements get special logo sound
    const logoElements = document.querySelectorAll('[data-sound="logo"]')
    logoElements.forEach(element => {
      if (element instanceof HTMLElement && !element.dataset.soundAdded) {
        addHoverSound(element, 'logo')
        element.dataset.soundAdded = 'true'
      }
    })
    
    // Special entrance elements
    const enterElements = document.querySelectorAll('[data-sound="enter"]')
    enterElements.forEach(element => {
      if (element instanceof HTMLElement && !element.dataset.soundAdded) {
        addHoverSound(element, 'enter')
        element.dataset.soundAdded = 'true'
      }
    })
    
    // Sharp/crystal elements
    const shardElements = document.querySelectorAll('[data-sound="shard"]')
    shardElements.forEach(element => {
      if (element instanceof HTMLElement && !element.dataset.soundAdded) {
        addHoverSound(element, 'shard')
        element.dataset.soundAdded = 'true'
      }
    })

    // Regular buttons and links
    const buttons = document.querySelectorAll('button, a[href], [role="button"]')
    buttons.forEach(button => {
      if (button instanceof HTMLElement && !button.dataset.soundAdded && !button.dataset.sound) {
        addHoverSound(button, 'default')
        button.dataset.soundAdded = 'true'
      }
    })
  }

  // Initial setup
  addSoundsToButtons()

  // Re-run when DOM changes
  const observer = new MutationObserver(() => {
    addSoundsToButtons()
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  return () => observer.disconnect()
}