<template>
  <nav class="navigation-dots fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
    <ul class="space-y-6">
      <li v-for="(section, index) in sections" :key="section.id">
        <button
          @click="scrollToSection(section.id)"
          :class="[
            'nav-dot w-3 h-3 rounded-full border-2 transition-all duration-300 hover:scale-125',
            activeSection === section.id
              ? 'bg-primary border-primary scale-150'
              : 'bg-transparent border-gray-400 hover:border-primary'
          ]"
          :title="section.name"
          @mouseenter="showTooltip = section.id"
          @mouseleave="showTooltip = null"
        />
        <Transition name="tooltip">
          <span
            v-if="showTooltip === section.id"
            class="absolute right-6 top-1/2 transform -translate-y-1/2 bg-dark text-white px-3 py-1 rounded text-sm whitespace-nowrap border border-gray-600"
          >
            {{ section.name }}
          </span>
        </Transition>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useSmoothScroll } from '~/composables/useSmoothScroll'

const { scrollTo } = useSmoothScroll()

const sections = [
  { id: 'hero', name: 'Home' },
  { id: 'about', name: 'About' },
  { id: 'portfolio', name: 'Portfolio' },
  { id: 'contact', name: 'Contact' }
]

const activeSection = ref('hero')
const showTooltip = ref<string | null>(null)

const scrollToSection = (sectionId: string) => {
  scrollTo(`#${sectionId}`)
}

const updateActiveSection = () => {
  const scrollPosition = window.scrollY + window.innerHeight / 2

  for (const section of sections) {
    const element = document.getElementById(section.id)
    if (element) {
      const { offsetTop, offsetHeight } = element

      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        activeSection.value = section.id
        break
      }
    }
  }
}

let scrollListener: (() => void) | null = null

onMounted(() => {
  // Initialize active section
  updateActiveSection()

  // Add scroll listener
  scrollListener = () => {
    requestAnimationFrame(updateActiveSection)
  }
  window.addEventListener('scroll', scrollListener, { passive: true })
})

onUnmounted(() => {
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener)
  }
})
</script>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateX(10px) translateY(-50%);
}

.nav-dot {
  cursor: pointer;
}

.nav-dot:focus {
  outline: 2px solid var(--accent-color);
  outline-offset: 4px;
}

/* Mobile responsive adjustments */
@media (max-width: 1024px) {
  .navigation-dots {
    display: none;
  }
}
</style>