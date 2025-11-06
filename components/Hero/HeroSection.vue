<template>
  <section id="hero" class="hero-section min-h-screen flex items-center justify-center relative">
    <!-- Particle background -->
    <ParticleBackground />

    <!-- Floating elements -->
    <FloatingElements />

    <!-- Main content -->
    <div class="hero-content relative z-10 text-center px-6 max-w-4xl mx-auto">
      <AnimatedText
        name="John Designer"
        title="Graphic Designer & Brand Identity Specialist"
        subtitle="Creating visual experiences that inspire and engage through thoughtful design and creative storytelling."
      />

      <!-- Call to action buttons -->
      <div class="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          @click="scrollToSection('portfolio')"
          class="hero-button primary-button bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          View My Work
        </button>
        <button
          @click="scrollToSection('contact')"
          class="hero-button secondary-button border-2 border-white text-white hover:bg-white hover:text-dark px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105"
        >
          Get In Touch
        </button>
      </div>

      <!-- Social links -->
      <div class="mt-16 flex justify-center space-x-6">
        <a
          v-for="social in socialLinks"
          :key="social.name"
          :href="social.url"
          :title="social.name"
          class="social-link w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-primary hover:bg-primary hover:scale-110 transition-all duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="text-gray-400 hover:text-white text-lg">{{ social.icon }}</span>
        </a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-indicator absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <div class="scroll-chevron animate-bounce">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <path
            d="M15 20L8 13L9.4 11.6L15 17.2L20.6 11.6L22 13L15 20Z"
            fill="currentColor"
            class="text-gray-400"
          />
        </svg>
      </div>
      <p class="text-gray-400 text-sm mt-2">Scroll to explore</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useSmoothScroll } from '~/composables/useSmoothScroll'

const { scrollTo } = useSmoothScroll()

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: 'in'
  },
  {
    name: 'Behance',
    url: 'https://behance.net',
    icon: 'Be'
  },
  {
    name: 'Dribbble',
    url: 'https://dribbble.com',
    icon: 'D'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com',
    icon: '📷'
  }
]

const scrollToSection = (sectionId: string) => {
  scrollTo(`#${sectionId}`)
}

onMounted(() => {
  // Register ScrollTrigger plugin
  if (process.client) {
    gsap.registerPlugin(ScrollTrigger)
  }

  // Animate hero content on scroll
  const heroContent = document.querySelector('.hero-content')
  if (heroContent) {
    gsap.to(heroContent, {
      opacity: 0,
      y: 100,
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '50% top',
        scrub: 1
      }
    })
  }

  // Animate buttons
  const buttons = document.querySelectorAll('.hero-button')
  buttons.forEach((button, index) => {
    gsap.from(button, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 4 + index * 0.2,
      ease: 'power3.out'
    })
  })

  // Animate social links
  const socialLinks = document.querySelectorAll('.social-link')
  gsap.from(socialLinks, {
    opacity: 0,
    scale: 0.8,
    duration: 0.8,
    delay: 4.5,
    stagger: 0.1,
    ease: 'back.out(1.7)'
  })

  // Animate scroll indicator
  const scrollIndicator = document.querySelector('.scroll-indicator')
  if (scrollIndicator) {
    gsap.from(scrollIndicator, {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 5,
      ease: 'power3.out'
    })
  }
})
</script>

<style scoped>
.hero-section {
  position: relative;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 10;
}

/* Button styles */
.primary-button {
  box-shadow: 0 10px 30px rgba(255, 107, 107, 0.3);
  background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
}

.primary-button:hover {
  box-shadow: 0 15px 40px rgba(255, 107, 107, 0.4);
}

.secondary-button:hover {
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
}

/* Social link styles */
.social-link {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.05);
}

/* Scroll indicator animation */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .hero-content {
    padding: 2rem 1rem;
  }

  .hero-button {
    width: 100%;
    max-width: 250px;
  }

  .social-link {
    width: 40px;
    height: 40px;
  }

  .scroll-indicator {
    bottom: 4rem;
  }
}

/* Ensure proper contrast and readability */
@media (prefers-reduced-motion: reduce) {
  .animate-bounce {
    animation: none;
  }

  .hero-button,
  .social-link {
    transition: none;
  }
}
</style>