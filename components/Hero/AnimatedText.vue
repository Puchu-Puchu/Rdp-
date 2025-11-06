<template>
  <div ref="textContainer" class="animated-text">
    <h1 ref="nameRef" class="text-6xl md:text-8xl font-bold mb-4">
      <span class="text-gradient">{{ name }}</span>
      <span ref="cursorRef" class="typewriter-cursor ml-1"></span>
    </h1>
    <p ref="titleRef" class="text-2xl md:text-3xl text-gray-300 opacity-0">
      {{ title }}
    </p>
    <p ref="subtitleRef" class="text-lg md:text-xl text-gray-400 mt-4 opacity-0">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/dist/TextPlugin'

if (process.client) {
  gsap.registerPlugin(TextPlugin)
}

interface Props {
  name: string
  title: string
  subtitle: string
}

const props = defineProps<Props>()

const textContainer = ref<HTMLElement | null>(null)
const nameRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const cursorRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  await nextTick()

  if (!nameRef.value || !titleRef.value || !subtitleRef.value || !cursorRef.value) return

  // Create timeline for coordinated animations
  const tl = gsap.timeline({
    delay: 0.5
  })

  // Set initial states
  gsap.set(titleRef.value, { opacity: 0, y: 30 })
  gsap.set(subtitleRef.value, { opacity: 0, y: 30 })
  gsap.set(cursorRef.value, { opacity: 1 })

  // Animate name with typewriter effect
  tl.to(nameRef.value, {
    text: props.name,
    duration: props.name.length * 0.05,
    ease: 'none'
  })

  // Fade in title after name completes
  tl.to(titleRef.value, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.3')

  // Fade in subtitle
  tl.to(subtitleRef.value, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out'
  }, '-=0.5')

  // Start cursor blink animation after typing
  tl.to(cursorRef.value, {
    opacity: 0,
    duration: 0.5,
    repeat: -1,
    yoyo: true,
    ease: 'none'
  })
})
</script>

<style scoped>
.animated-text {
  position: relative;
  z-index: 10;
}

.text-gradient {
  background: linear-gradient(135deg, #FF6B6B, #4ECDC4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: gradientShift 4s ease infinite;
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

.typewriter-cursor {
  display: inline-block;
  width: 4px;
  height: 1.2em;
  background-color: #FF6B6B;
  vertical-align: text-bottom;
}

/* Responsive typography */
@media (max-width: 768px) {
  .text-6xl {
    font-size: 3rem;
    line-height: 1.1;
  }

  .text-2xl {
    font-size: 1.5rem;
  }

  .text-lg {
    font-size: 1.125rem;
  }
}

/* Ensure text is readable on smaller screens */
@media (max-width: 640px) {
  .text-8xl {
    font-size: 2.5rem;
  }

  .text-3xl {
    font-size: 1.25rem;
  }

  .text-xl {
    font-size: 1rem;
  }
}
</style>