<template>
  <div class="floating-elements">
    <!-- Geometric shapes that float around the hero section -->
    <div
      v-for="(element, index) in elements"
      :key="index"
      :ref="`element-${index}`"
      class="floating-element"
      :class="element.shape"
      :style="{
        left: element.x + '%',
        top: element.y + '%',
        animationDelay: element.delay + 's',
        animationDuration: element.duration + 's'
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

interface FloatingElement {
  shape: string
  x: number
  y: number
  delay: number
  duration: number
}

const elements: FloatingElement[] = [
  { shape: 'circle', x: 10, y: 20, delay: 0, duration: 6 },
  { shape: 'square', x: 85, y: 15, delay: 1, duration: 8 },
  { shape: 'triangle', x: 15, y: 75, delay: 2, duration: 7 },
  { shape: 'hexagon', x: 80, y: 80, delay: 1.5, duration: 9 },
  { shape: 'circle', x: 50, y: 10, delay: 3, duration: 5 },
  { shape: 'square', x: 5, y: 50, delay: 2.5, duration: 6.5 }
]

const elementRefs = ref<HTMLElement[]>([])

onMounted(() => {
  // Set up GSAP animations for each element
  elementRefs.value.forEach((element, index) => {
    if (element) {
      // Create floating animation
      gsap.to(element, {
        y: -20,
        duration: elements[index].duration,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: elements[index].delay
      })

      // Add slight rotation
      gsap.to(element, {
        rotation: 360,
        duration: elements[index].duration * 2,
        repeat: -1,
        ease: 'none',
        delay: elements[index].delay
      })

      // Add interactive hover effect
      element.addEventListener('mouseenter', () => {
        gsap.to(element, {
          scale: 1.2,
          duration: 0.3,
          ease: 'back.out(1.7)'
        })
      })

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        })
      })
    }
  })
})
</script>

<style scoped>
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}

.floating-element {
  position: absolute;
  opacity: 0.1;
  transition: opacity 0.3s ease;
  pointer-events: all;
  cursor: pointer;
}

.floating-element:hover {
  opacity: 0.3;
}

.circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF6B6B, #4ECDC4);
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.square {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #45B7D1, #4ECDC4);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.triangle {
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 52px solid #FF6B6B;
  opacity: 0.1;
  filter: drop-shadow(0 0 10px rgba(255, 107, 107, 0.3));
}

.hexagon {
  width: 60px;
  height: 33px;
  background: #45B7D1;
  position: relative;
  opacity: 0.1;
  filter: drop-shadow(0 0 10px rgba(69, 183, 209, 0.3));
}

.hexagon:before,
.hexagon:after {
  content: "";
  position: absolute;
  width: 0;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
}

.hexagon:before {
  bottom: 100%;
  border-bottom: 17px solid #45B7D1;
}

.hexagon:after {
  top: 100%;
  border-top: 17px solid #45B7D1;
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .floating-element {
    transform: scale(0.7);
  }

  .circle {
    width: 40px;
    height: 40px;
  }

  .square {
    width: 35px;
    height: 35px;
  }

  .triangle {
    border-left-width: 20px;
    border-right-width: 20px;
    border-bottom-width: 35px;
  }

  .hexagon {
    width: 40px;
    height: 22px;
  }

  .hexagon:before,
  .hexagon:after {
    border-left-width: 20px;
    border-right-width: 20px;
  }

  .hexagon:before {
    border-bottom-width: 11px;
  }

  .hexagon:after {
    border-top-width: 11px;
  }
}
</style>