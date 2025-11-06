<template>
  <div id="app" class="bg-dark text-white overflow-x-hidden">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />

    <!-- Canvas for particle effects -->
    <canvas id="particle-canvas" />

    <!-- Navigation dots -->
    <NavigationDots />

    <!-- Scroll progress bar -->
    <ScrollProgress />

    <!-- Main content -->
    <main>
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ContactSection />
    </main>

    <!-- Modal overlay for portfolio items -->
    <ProjectModal />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useSmoothScroll } from '~/composables/useSmoothScroll'
import { useGSAPAnimations } from '~/composables/useGSAP'

// Initialize smooth scrolling
const { initSmoothScroll, destroySmoothScroll } = useSmoothScroll()

// Initialize GSAP
const { initGSAP } = useGSAPAnimations()

onMounted(() => {
  initSmoothScroll()
  initGSAP()
})

onUnmounted(() => {
  destroySmoothScroll()
})

// SEO and meta
useHead({
  title: 'Graphic Designer Portfolio - Creative Visual Design',
  meta: [
    { name: 'description', content: 'Award-winning graphic designer showcasing brand identity, logo design, and creative visual work with cutting-edge animations' },
    { property: 'og:title', content: 'Graphic Designer Portfolio' },
    { property: 'og:description', content: 'Creative visual design portfolio with brand identity and logo design expertise' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Graphic Designer Portfolio' },
    { name: 'twitter:description', content: 'Creative visual design portfolio showcasing brand identity work' }
  ]
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

:root {
  --primary-color: #FF6B6B;
  --secondary-color: #4ECDC4;
  --accent-color: #45B7D1;
  --dark-color: #1A1A2E;
  --light-color: #F7F7F7;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: 'Inter', system-ui, sans-serif;
  scroll-behavior: smooth;
}

body {
  background-color: var(--dark-color);
  color: var(--light-color);
  overflow-x: hidden;
}

section {
  min-height: 100vh;
  position: relative;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Hide scrollbar but keep functionality */
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

/* Custom selection color */
::selection {
  background-color: var(--primary-color);
  color: white;
}

/* Focus styles for accessibility */
*:focus {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

/* Remove focus outline for mouse users */
*:focus:not(:focus-visible) {
  outline: none;
}
</style>
