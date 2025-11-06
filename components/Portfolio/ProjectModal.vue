<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button @click="closeModal" class="close-button absolute top-6 right-6 text-white hover:text-primary transition-colors">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M24 8L8 24M8 8L24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <div v-if="selectedProject" class="project-modal-content">
        <!-- Project header -->
        <div class="project-header text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold mb-4">{{ selectedProject.title }}</h2>
          <p class="text-xl text-gray-300 mb-4">{{ selectedProject.client }}</p>
          <div class="flex flex-wrap gap-2 justify-center">
            <span
              v-for="tag in selectedProject.tags"
              :key="tag"
              class="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Project content placeholder -->
        <div class="project-body">
          <div class="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-8">
            <div class="text-center">
              <p class="text-6xl mb-4">🎨</p>
              <p class="text-gray-300">Project showcase would appear here</p>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-2xl font-bold mb-4 text-primary">Project Story</h3>
              <p class="text-gray-300 leading-relaxed">
                {{ selectedProject.story }}
              </p>
            </div>
            <div>
              <h3 class="text-2xl font-bold mb-4 text-secondary">Brand Colors</h3>
              <div class="flex gap-4 mb-6">
                <div
                  v-for="color in selectedProject.brandColors"
                  :key="color"
                  class="w-16 h-16 rounded-lg shadow-lg"
                  :style="{ backgroundColor: color }"
                  :title="color"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { gsap } from 'gsap'

const isOpen = ref(false)
const selectedProject = ref<any>(null)

const openModal = (project: any) => {
  selectedProject.value = project
  isOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isOpen.value = false
  selectedProject.value = null
  document.body.style.overflow = ''
}

// Watch for modal state changes to trigger animations
watch(isOpen, (newState) => {
  if (newState) {
    // Modal opening animation
    gsap.from('.modal-content', {
      scale: 0.8,
      opacity: 0,
      duration: 0.4,
      ease: 'back.out(1.7)'
    })
  }
})

// Expose the openModal function to parent components
defineExpose({
  openModal
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-content {
  background: var(--dark-color);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  max-width: 4xl;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-button {
  z-index: 10;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.project-modal-content {
  padding: 3rem;
}

/* Custom scrollbar for modal content */
.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: var(--secondary-color);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 1rem;
  }

  .project-modal-content {
    padding: 2rem 1.5rem;
  }

  .close-button {
    width: 40px;
    height: 40px;
    top: 1rem;
    right: 1rem;
  }
}
</style>