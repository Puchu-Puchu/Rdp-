<template>
  <section id="about" class="about-section min-h-screen flex items-center justify-center py-20 relative">
    <div class="container mx-auto px-6 max-w-6xl">
      <div class="text-center mb-16">
        <h2 class="text-5xl md:text-6xl font-bold mb-6 text-gradient">About Me</h2>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          Passionate graphic designer with over 8 years of experience creating memorable brand identities
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Text content -->
        <div class="space-y-6">
          <div class="story-block reveal-from-bottom">
            <h3 class="text-3xl font-bold mb-4 text-primary">Design Philosophy</h3>
            <p class="text-gray-300 leading-relaxed">
              I believe that great design is not just about aesthetics—it's about creating meaningful connections
              between brands and their audience. Every project is an opportunity to tell a unique story through
              visual language.
            </p>
          </div>

          <div class="story-block reveal-from-bottom">
            <h3 class="text-3xl font-bold mb-4 text-secondary">Expertise</h3>
            <ul class="text-gray-300 space-y-2">
              <li>• Brand Identity & Logo Design</li>
              <li>• Digital & Print Design</li>
              <li>• UI/UX Design</li>
              <li>• Motion Graphics</li>
            </ul>
          </div>
        </div>

        <!-- Skills showcase -->
        <div class="space-y-6">
          <div v-for="skill in skills" :key="skill.name" class="skill-item">
            <div class="flex justify-between mb-2">
              <span class="text-gray-300">{{ skill.name }}</span>
              <span class="text-primary">{{ skill.level }}%</span>
            </div>
            <div class="skill-bar">
              <div
                class="skill-progress"
                :style="{ width: skill.level + '%' }"
              ></div>
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

const skills = [
  { name: 'Brand Identity', level: 95 },
  { name: 'Logo Design', level: 90 },
  { name: 'UI/UX Design', level: 85 },
  { name: 'Typography', level: 88 },
  { name: 'Motion Graphics', level: 75 }
]

onMounted(() => {
  // Animate skill bars
  const skillItems = document.querySelectorAll('.skill-item')
  skillItems.forEach((item, index) => {
    const progressBar = item.querySelector('.skill-progress')
    if (progressBar) {
      gsap.fromTo(progressBar,
        { width: 0 },
        {
          width: progressBar.style.width,
          duration: 1.5,
          delay: 0.5 + index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            once: true
          }
        }
      )
    }
  })

  // Animate story blocks
  const storyBlocks = document.querySelectorAll('.story-block')
  gsap.from(storyBlocks, {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 70%',
      once: true
    }
  })
})
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(135deg, #4ECDC4, #45B7D1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.skill-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, #FF6B6B, #4ECDC4);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.reveal-from-bottom {
  opacity: 0;
  transform: translateY(50px);
}

.reveal-from-bottom.active {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>