<template>
  <div class="particle-background">
    <canvas ref="canvasRef" class="particle-canvas" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useThreeJS } from '~/composables/useThreeJS'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const { initParticles, destroyParticles } = useThreeJS()

onMounted(async () => {
  await nextTick()
  if (canvasRef.value) {
    // Adjust particle count based on device performance
    const particleCount = isMobile() ? 200 : 1000

    initParticles(canvasRef.value, {
      particleCount,
      particleSize: isMobile() ? 1.5 : 2,
      particleColor: 0x4ECDC4,
      connectionDistance: isMobile() ? 100 : 150,
      mouseInfluenceRadius: isMobile() ? 100 : 200,
      mouseInfluenceStrength: 0.03
    })
  }
})

onUnmounted(() => {
  destroyParticles()
})

// Helper function to detect mobile devices
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth < 768
}
</script>

<style scoped>
.particle-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.particle-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

/* Performance optimizations for mobile */
@media (max-width: 768px) {
  .particle-canvas {
    opacity: 0.6;
  }
}
</style>