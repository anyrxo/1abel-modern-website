'use client'

import { useEffect } from 'react'
import { useSound, initGlobalSounds } from '@/lib/soundManager'
import { GlobalSoundHooks } from './GlobalSoundHooks'

export function GlobalSoundSystem() {
  const { enable, setVolume: setSoundVolume, startAtmosphere } = useSound()

  useEffect(() => {
    // Initialize global sound system
    const cleanup = initGlobalSounds()
    
    // Enable sounds by default with soft but hearable volume
    const defaultVolume = 0.25 // Soft but hearable
    enable()
    setSoundVolume(defaultVolume)
    
    // Start atmosphere after a brief delay
    setTimeout(() => {
      startAtmosphere()
    }, 1000)
    
    return cleanup
  }, [enable, setSoundVolume, startAtmosphere])

  return <GlobalSoundHooks />
}