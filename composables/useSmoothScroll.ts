import Lenis from 'lenis'

export const useSmoothScroll = () => {
  let lenis: Lenis | null = null

  const initSmoothScroll = () => {
    if (process.client) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      })

      // Connect to requestAnimationFrame
      function raf(time: number) {
        lenis?.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)

      // Add scroll event listeners for GSAP ScrollTrigger
      lenis.on('scroll', (e: any) => {
        // Custom scroll events
        document.dispatchEvent(new CustomEvent('lenisScroll', {
          detail: {
            scroll: e.scroll,
            limit: e.limit,
            velocity: e.velocity,
            direction: e.direction,
            progress: e.progress
          }
        }))
      })

      // Handle scroll-related links
      const handleAnchorClick = (e: Event) => {
        const target = e.target as HTMLElement
        const href = target.getAttribute('href')

        if (href && href.startsWith('#')) {
          e.preventDefault()
          const element = document.querySelector(href)
          if (element) {
            lenis?.scrollTo(element, {
              offset: 0,
              duration: 1.5,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            })
          }
        }
      }

      document.addEventListener('click', handleAnchorClick)
    }
  }

  const destroySmoothScroll = () => {
    if (lenis) {
      lenis.destroy()
      lenis = null
    }
  }

  const scrollTo = (target: string | HTMLElement, offset = 0) => {
    if (lenis) {
      const element = typeof target === 'string' ? document.querySelector(target) : target
      if (element) {
        lenis.scrollTo(element, {
          offset,
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        })
      }
    }
  }

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, {
        offset: 0,
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      })
    }
  }

  return {
    initSmoothScroll,
    destroySmoothScroll,
    scrollTo,
    scrollToTop,
    lenis: () => lenis
  }
}