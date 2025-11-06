<template>
  <section id="portfolio" class="portfolio-section min-h-screen py-20 relative">
    <div class="container mx-auto px-6 max-w-7xl">
      <div class="text-center mb-16">
        <h2 class="text-5xl md:text-6xl font-bold mb-6 text-gradient">Portfolio</h2>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          Explore my latest brand identity and logo design projects
        </p>
      </div>

      <!-- Portfolio grid -->
      <div class="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in featuredProjects"
          :key="project.id"
          class="project-card group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
          @click="openProjectModal(project)"
        >
          <div class="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <!-- Project preview placeholder -->
            <div class="text-center p-6">
              <div class="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span class="text-white text-3xl font-bold">{{ project.title.charAt(0) }}</span>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">{{ project.title }}</h3>
              <p class="text-gray-300 text-sm">{{ project.client }}</p>
              <div class="flex flex-wrap gap-2 mt-4 justify-center">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Hover overlay -->
          <div class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div class="text-center p-6">
              <p class="text-white mb-4">{{ project.description }}</p>
              <button class="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition-colors">
                View Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Mock project data
const featuredProjects = [
  {
    id: '1',
    title: 'TechCorp Rebrand',
    client: 'TechCorp Industries',
    description: 'Complete brand identity redesign for a leading technology company',
    tags: ['Branding', 'Logo', 'Guidelines'],
    images: [],
    brandColors: ['#FF6B6B', '#4ECDC4'],
    story: 'TechCorp needed a modern brand identity that would reflect their innovative approach to technology.'
  },
  {
    id: '2',
    title: 'EcoLife Organic',
    client: 'EcoLife Foods',
    description: 'Organic food company branding with sustainable values',
    tags: ['Branding', 'Packaging', 'Logo'],
    images: [],
    brandColors: ['#4ECDC4', '#45B7D1'],
    story: 'Creating a brand that communicates freshness, sustainability, and trust.'
  },
  {
    id: '3',
    title: 'Creative Agency',
    client: 'Studio Creative',
    description: 'Bold identity for a digital creative agency',
    tags: ['Branding', 'Logo', 'Web'],
    images: [],
    brandColors: ['#FF6B6B', '#45B7D1'],
    story: 'A vibrant brand identity that captures the creative energy of the team.'
  },
  {
    id: '4',
    title: 'Luxury Resort',
    client: 'Paradise Resorts',
    description: 'Elegant branding for luxury hospitality brand',
    tags: ['Branding', 'Logo', 'Print'],
    images: [],
    brandColors: ['#FFD700', '#1A1A2E'],
    story: 'Sophisticated branding that reflects luxury and exceptional service.'
  },
  {
    id: '5',
    title: 'Fitness App',
    client: 'FitLife Mobile',
    description: 'Modern identity for fitness tracking application',
    tags: ['Branding', 'UI/UX', 'Logo'],
    images: [],
    brandColors: ['#FF6B6B', '#4ECDC4'],
    story: 'Dynamic branding that motivates and inspires fitness goals.'
  },
  {
    id: '6',
    title: 'Coffee Shop',
    client: 'Urban Grind',
    description: 'Local coffee house branding and packaging',
    tags: ['Branding', 'Logo', 'Packaging'],
    images: [],
    brandColors: ['#8B4513', '#D2691E'],
    story: 'Warm and inviting brand identity for neighborhood coffee shop.'
  }
]

const openProjectModal = (project: any) => {
  // This will be implemented when we create the ProjectModal component
  console.log('Opening project modal for:', project.title)
}

onMounted(() => {
  // Animate project cards on scroll
  const projectCards = document.querySelectorAll('.project-card')
  gsap.from(projectCards, {
    opacity: 0,
    y: 100,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.portfolio-grid',
      start: 'top 80%',
      once: true
    }
  })
})
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(135deg, #45B7D1, #FF6B6B);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.project-card {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.project-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}
</style>