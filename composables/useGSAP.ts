import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { TextPlugin } from 'gsap/dist/TextPlugin'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

export const useGSAPAnimations = () => {
  let timelines: { [key: string]: gsap.core.Timeline } = {}
  let animations: { [key: string]: gsap.core.Tween } = {}

  const initGSAP = () => {
    if (process.client) {
      // Set default GSAP settings
      gsap.defaults({
        ease: 'power3.out',
        duration: 1,
      })

      // Initialize ScrollTrigger
      ScrollTrigger.defaults({
        toggleActions: 'play none none reverse',
      })

      // Refresh ScrollTrigger on load
      window.addEventListener('load', () => {
        ScrollTrigger.refresh()
      })
    }
  }

  // Create animated text typewriter effect
  const typewriterText = (element: string | HTMLElement, text: string, options = {}) => {
    if (!process.client) return null

    const el = typeof element === 'string' ? document.querySelector(element) : element
    if (!el) return null

    const timeline = gsap.timeline(options)

    timeline.to(el, {
      text: text,
      duration: text.length * 0.05,
      ease: 'none',
    })

    return timeline
  }

  // Create staggered animation for multiple elements
  const staggerElements = (
    elements: string | NodeListOf<Element>,
    animation: gsap.TweenVars,
    stagger = 0.1
  ) => {
    if (!process.client) return null

    const els = typeof elements === 'string' ? document.querySelectorAll(elements) : elements
    if (!els.length) return null

    return gsap.to(els, {
      ...animation,
      stagger,
    })
  }

  // Create reveal animation
  const revealElement = (
    element: string | HTMLElement,
    animation: gsap.TweenVars = {},
    scrollTrigger = true
  ) => {
    if (!process.client) return null

    const el = typeof element === 'string' ? document.querySelector(element) : element
    if (!el) return null

    const defaults = {
      opacity: 0,
      y: 50,
      duration: 1,
      ...animation
    }

    if (scrollTrigger) {
      return gsap.from(el, {
        ...defaults,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        }
      })
    } else {
      return gsap.from(el, defaults)
    }
  }

  // Create parallax effect
  const parallaxElement = (
    element: string | HTMLElement,
    speed: number = 0.5,
    direction: 'vertical' | 'horizontal' = 'vertical'
  ) => {
    if (!process.client) return null

    const el = typeof element === 'string' ? document.querySelector(element) : element
    if (!el) return null

    const property = direction === 'vertical' ? 'y' : 'x'
    const amount = speed * 100

    return gsap.to(el, {
      [property]: -amount,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    })
  }

  // Create floating animation
  const floatAnimation = (element: string | HTMLElement, duration = 6, distance = 20) => {
    if (!process.client) return null

    const el = typeof element === 'string' ? document.querySelector(element) : element
    if (!el) return null

    const timeline = gsap.timeline({ repeat: -1, yoyo: true })

    timeline.to(el, {
      y: -distance,
      duration: duration / 2,
      ease: 'power1.inOut'
    }).to(el, {
      y: 0,
      duration: duration / 2,
      ease: 'power1.inOut'
    })

    return timeline
  }

  // Create timeline for coordinated animations
  const createTimeline = (name: string, options = {}) => {
    if (!process.client) return null

    timelines[name] = gsap.timeline(options)
    return timelines[name]
  }

  // Get existing timeline
  const getTimeline = (name: string) => {
    return timelines[name] || null
  }

  // Kill all animations
  const killAllAnimations = () => {
    if (process.client) {
      // Kill all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())

      // Kill all timelines
      Object.values(timelines).forEach(timeline => timeline.kill())

      // Kill all animations
      Object.values(animations).forEach(animation => animation.kill())

      // Clear references
      timelines = {}
      animations = {}
    }
  }

  // Refresh ScrollTrigger
  const refreshScrollTrigger = () => {
    if (process.client) {
      ScrollTrigger.refresh()
    }
  }

  return {
    initGSAP,
    typewriterText,
    staggerElements,
    revealElement,
    parallaxElement,
    floatAnimation,
    createTimeline,
    getTimeline,
    killAllAnimations,
    refreshScrollTrigger,
    gsap,
    ScrollTrigger,
  }
}