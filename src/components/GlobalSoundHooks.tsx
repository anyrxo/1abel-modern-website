'use client'

import { useEffect } from 'react'
import { useSound } from '@/lib/soundManager'

/**
 * GlobalSoundHooks - Adds sound interactions to common HTML elements
 * This component runs once per page to enhance UI elements with sound
 */
export function GlobalSoundHooks() {
  const { playButtonHover, playButtonClick, playLinkHover, playFormInteraction } = useSound()

  useEffect(() => {
    let cleanup: (() => void)[] = []

    // Add sounds to regular buttons (not ShimmerButton - that has its own sounds)
    const buttons = document.querySelectorAll('button:not([data-shimmer-button])')
    buttons.forEach(button => {
      const hoverHandler = () => playButtonHover()
      const clickHandler = () => playButtonClick()
      
      button.addEventListener('mouseenter', hoverHandler)
      button.addEventListener('click', clickHandler)
      
      cleanup.push(() => {
        button.removeEventListener('mouseenter', hoverHandler)
        button.removeEventListener('click', clickHandler)
      })
    })

    // Add sounds to links (except those with specific sound handlers)
    const links = document.querySelectorAll('a:not([data-has-sound])')
    links.forEach(link => {
      const hoverHandler = () => playLinkHover()
      
      link.addEventListener('mouseenter', hoverHandler)
      
      cleanup.push(() => {
        link.removeEventListener('mouseenter', hoverHandler)
      })
    })

    // Add sounds to form elements
    const formElements = document.querySelectorAll('input, textarea, select')
    formElements.forEach(element => {
      const focusHandler = () => playFormInteraction()
      
      element.addEventListener('focus', focusHandler)
      
      cleanup.push(() => {
        element.removeEventListener('focus', focusHandler)
      })
    })

    // Add special sounds to navigation elements
    const navElements = document.querySelectorAll('nav a, [role="navigation"] a')
    navElements.forEach(element => {
      const clickHandler = () => playButtonClick()
      
      element.addEventListener('click', clickHandler)
      
      cleanup.push(() => {
        element.removeEventListener('click', clickHandler)
      })
    })

    // Cleanup function
    return () => {
      cleanup.forEach(fn => fn())
    }
  }, [playButtonHover, playButtonClick, playLinkHover, playFormInteraction])

  return null // This component doesn't render anything
}