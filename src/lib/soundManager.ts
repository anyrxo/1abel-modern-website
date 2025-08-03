/**
 * Simple Sound Manager for 1ABEL - Beautiful Interactions
 * Handles hover sounds and click feedback
 */

interface SoundConfig {
  volume: number
  loop?: boolean
}

export class SoundManager {
  private enabled: boolean = true
  private globalVolume: number = 0.3
  private context: AudioContext | null = null
  private initialized: boolean = false

  constructor() {
    // Initialize on first user interaction
    if (typeof window !== 'undefined') {
      ['click', 'touchstart'].forEach(event => {
        window.addEventListener(event, () => this.init(), { once: true })
      })
    }
  }

  private async init() {
    if (this.initialized) return
    
    try {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)()
      this.initialized = true
    } catch (error) {
      console.warn('Audio context initialization failed:', error)
    }
  }

  // Create a simple tone for UI feedback
  private createTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.context || !this.enabled) return

    const oscillator = this.context.createOscillator()
    const gainNode = this.context.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.context.destination)

    oscillator.frequency.value = frequency
    oscillator.type = type
    
    gainNode.gain.setValueAtTime(0, this.context.currentTime)
    gainNode.gain.linearRampToValueAtTime(this.globalVolume * 0.1, this.context.currentTime + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration)

    oscillator.start(this.context.currentTime)
    oscillator.stop(this.context.currentTime + duration)
  }

  // UI Sound Effects
  public playHover() {
    this.createTone(800, 0.1)
  }

  public playClick() {
    this.createTone(1000, 0.15)
  }

  public playSuccess() {
    this.createTone(600, 0.2)
    setTimeout(() => this.createTone(800, 0.2), 100)
  }

  public enable() {
    this.enabled = true
  }

  public disable() {
    this.enabled = false
  }

  public setVolume(volume: number) {
    this.globalVolume = Math.max(0, Math.min(1, volume))
  }
}

// Global instance
export const soundManager = new SoundManager()

// React hook for using sound manager
export function useSound() {
  return {
    playHover: () => soundManager.playHover(),
    playClick: () => soundManager.playClick(),
    playSuccess: () => soundManager.playSuccess(),
    enable: () => soundManager.enable(),
    disable: () => soundManager.disable(),
    setVolume: (volume: number) => soundManager.setVolume(volume)
  }
}

// Add hover sounds to elements
export function addHoverSound(element: HTMLElement) {
  const handleMouseEnter = () => soundManager.playHover()
  const handleClick = () => soundManager.playClick()

  element.addEventListener('mouseenter', handleMouseEnter)
  element.addEventListener('click', handleClick)

  // Return cleanup function
  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter)
    element.removeEventListener('click', handleClick)
  }
}

// Initialize interactive sounds for buttons
export function initInteractiveSounds() {
  if (typeof window === 'undefined') return

  // Add sounds to all buttons
  const addSoundsToButtons = () => {
    const buttons = document.querySelectorAll('button, a[href], [role="button"]')
    buttons.forEach(button => {
      if (button instanceof HTMLElement && !button.dataset.soundAdded) {
        addHoverSound(button)
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