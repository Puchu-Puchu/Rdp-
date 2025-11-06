<template>
  <div class="scroll-progress fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
    <div
      ref="progressBar"
      class="scroll-progress-bar h-full bg-gradient-to-r from-primary to-secondary transform origin-left transition-transform duration-200"
      :style="{ transform: `scaleX(${scrollProgress})` }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrollProgress = ref(0)
const progressBar = ref<HTMLElement | null>(null)

const updateScrollProgress = () => {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  const currentScroll = window.scrollY

  if (scrollHeight > 0) {
    scrollProgress.value = Math.min(currentScroll / scrollHeight, 1)
  }
}

let scrollListener: (() => void) | null = null
let resizeListener: (() => void) | null = null

onMounted(() => {
  // Initial update
  updateScrollProgress()

  // Add scroll listener with throttling for performance
  let ticking = false
  scrollListener = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollProgress()
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener('scroll', scrollListener, { passive: true })

  // Add resize listener
  resizeListener = () => {
    updateScrollProgress()
  }

  window.addEventListener('resize', resizeListener, { passive: true })
})

onUnmounted(() => {
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener)
  }
  if (resizeListener) {
    window.removeEventListener('resize', resizeListener)
  }
})
</script>

<style scoped>
.scroll-progress {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.scroll-progress-bar {
  background-size: 200% 100%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>