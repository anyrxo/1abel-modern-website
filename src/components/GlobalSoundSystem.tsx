'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { useSound, initGlobalSounds } from '@/lib/soundManager'
import { GlobalSoundHooks } from './GlobalSoundHooks'

export function GlobalSoundSystem() {
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(0.4)
  const { enable, disable, setVolume: setSoundVolume, playWelcome, startAtmosphere } = useSound()

  useEffect(() => {
    // Initialize global sound system
    const cleanup = initGlobalSounds()
    
    // Check stored preferences
    const savedMuted = localStorage.getItem('1abel-sound-muted')
    const savedVolume = localStorage.getItem('1abel-sound-volume')
    
    if (savedMuted === 'false') {
      setIsMuted(false)
      enable()
      if (savedVolume) {
        const vol = parseFloat(savedVolume)
        setVolume(vol)
        setSoundVolume(vol)
      }
      // Ensure atmosphere starts on page load if sounds are enabled
      setTimeout(() => {
        startAtmosphere()
      }, 1000)
    }
    
    return cleanup
  }, [enable, setSoundVolume, startAtmosphere])

  const toggleMute = () => {
    const newMuted = !isMuted
    setIsMuted(newMuted)
    
    if (newMuted) {
      disable()
    } else {
      enable()
      setSoundVolume(volume)
      // Play welcome sequence and start atmosphere when first enabling
      setTimeout(() => {
        playWelcome()
        startAtmosphere()
      }, 300)
    }
    
    localStorage.setItem('1abel-sound-muted', newMuted.toString())
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    
    if (newVolume === 0) {
      setIsMuted(true)
      disable()
    } else {
      if (isMuted) {
        setIsMuted(false)
        enable()
      }
      setSoundVolume(newVolume)
    }
    
    localStorage.setItem('1abel-sound-volume', newVolume.toString())
    localStorage.setItem('1abel-sound-muted', (newVolume === 0).toString())
  }

  return (
    <>
      <GlobalSoundHooks />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
        className="fixed bottom-6 right-6 z-50"
      >
      <div className="bg-black/80 backdrop-blur border border-gray-700 rounded-lg p-3 flex items-center space-x-3">
        <motion.button
          onClick={toggleMute}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          title={isMuted ? 'Enable Sound' : 'Disable Sound'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-gray-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-white" />
          )}
        </motion.button>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400 min-w-[35px]">
            {Math.round(volume * 100)}%
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-16 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
            }}
          />
        </div>
      </div>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 10px;
          width: 10px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
          border: 1px solid #fff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 10px;
          width: 10px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
          border: 1px solid #fff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
      `}</style>
    </motion.div>
    </>
  )
}