'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Volume2, VolumeX, Music } from 'lucide-react'
import { useSound } from '@/lib/soundManager'

export function SoundControl() {
  const [isMuted, setIsMuted] = useState(true)  // Start muted by default
  const [volume, setVolume] = useState(0.4)
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [showControl, setShowControl] = useState(false)
  const { 
    setVolume: setSoundVolume, 
    enable, 
    disable,
    stopAll,
    playWelcome
  } = useSound()

  useEffect(() => {
    // Start with sound disabled by default
    disable()
    setSoundVolume(0)
    
    // Check if user has a preference stored
    const savedMute = localStorage.getItem('1abel-sound-muted')
    const savedVolume = localStorage.getItem('1abel-sound-volume')
    
    if (savedMute === 'false') {
      setIsMuted(false)
      enable()
      if (savedVolume) {
        const vol = parseFloat(savedVolume)
        setVolume(vol)
        setSoundVolume(vol)
      } else {
        setSoundVolume(0.4)
      }
    }
    
    if (savedVolume && savedMute !== 'false') {
      const vol = parseFloat(savedVolume)
      setVolume(vol)
    }

    // Show control only after user scrolls down
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowControl(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setSoundVolume, enable, disable])

  const toggleMute = () => {
    const newMuted = !isMuted
    setIsMuted(newMuted)
    
    if (newMuted) {
      disable()
      stopAll()
    } else {
      enable()
      setSoundVolume(volume)
      
      // 🎼 Welcome sequence when user first enables audio
      setTimeout(() => playWelcome(), 300)
    }
    
    localStorage.setItem('1abel-sound-muted', newMuted.toString())
  }

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume)
    
    if (newVolume === 0) {
      setIsMuted(true)
      disable()
      setSoundVolume(0)
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

  const toggleMusic = () => {
    // Simple toggle for now
    setMusicPlaying(!musicPlaying)
  }

  if (!showControl) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="bg-black/80 backdrop-blur border border-gray-700 rounded-lg p-4 flex items-center space-x-3">
        <motion.button
          onClick={toggleMute}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          data-sound="shard"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-gray-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-white" />
          )}
        </motion.button>
        
        <motion.button
          onClick={toggleMusic}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 rounded-lg transition-colors ${
            musicPlaying 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-gray-800 hover:bg-gray-700 text-gray-400'
          }`}
          data-sound="shard"
        >
          <Music className="w-4 h-4" />
        </motion.button>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400 min-w-[40px]">
            {Math.round(volume * 100)}%
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
            className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
            }}
          />
        </div>
      </div>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .slider::-moz-range-thumb {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: #dc2626;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
      `}</style>
    </motion.div>
  )
}