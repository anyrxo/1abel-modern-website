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

  // UI Sound Effects with OGG files
  public playHover() {
    this.playSound('ui-short', { volume: 0.3 })
  }

  public playClick() {
    this.playSound('click-project', { volume: 0.5 })
  }

  public playSuccess() {
    this.playSound('beeps', { volume: 0.4 })
  }

  public playEnter() {
    this.playSound('enter-project', { volume: 0.6 })
  }

  public playLeave() {
    this.playSound('leave-project', { volume: 0.4 })
  }

  public playLogo() {
    this.playSound('logo', { volume: 0.5 })
  }

  public playParticles() {
    this.playSound('particles', { volume: 0.3, loop: true })
  }

  public playShard() {
    this.playSound('shard', { volume: 0.4 })
  }

  public playBeeps(variation: number = 1) {
    const soundName = variation === 1 ? 'beeps' : variation === 2 ? 'beeps2' : 'beeps3'
    this.playSound(soundName, { volume: 0.4 })
  }

  public playWind() {
    this.playSound('wind', { volume: 0.2, loop: true, fadeIn: 2 })
  }

  public playCircles() {
    this.playSound('circles', { volume: 0.3 })
  }

  public playManifesto() {
    this.playSound('manifesto', { volume: 0.5 })
  }

  public playIgloo() {
    this.playSound('igloo', { volume: 0.3 })
  }

  public playProjectText() {
    this.playSound('project-text', { volume: 0.4 })
  }

  // Random sound variations
  public playRandomBeep() {
    const variation = Math.floor(Math.random() * 3) + 1
    this.playBeeps(variation)
  }

  public playRandomUI() {
    const sounds = ['ui-short', 'ui-long']
    const sound = sounds[Math.floor(Math.random() * sounds.length)]
    this.playSound(sound, { volume: 0.3 })
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
    this.playSound('room', { volume: 0.2, loop: true, fadeIn: 2 })
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
  }

  public disable() {
    this.enabled = false
    this.stopAllSounds()
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
    
    // Enhanced sounds
    playEnter: () => soundManager.playEnter(),
    playLeave: () => soundManager.playLeave(),
    playLogo: () => soundManager.playLogo(),
    playParticles: () => soundManager.playParticles(),
    playShard: () => soundManager.playShard(),
    playBeeps: (variation?: number) => soundManager.playBeeps(variation),
    playWind: () => soundManager.playWind(),
    playCircles: () => soundManager.playCircles(),
    playManifesto: () => soundManager.playManifesto(),
    playIgloo: () => soundManager.playIgloo(),
    playProjectText: () => soundManager.playProjectText(),
    playRandomBeep: () => soundManager.playRandomBeep(),
    playRandomUI: () => soundManager.playRandomUI(),
    
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