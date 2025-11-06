<template>
  <section id="contact" class="contact-section min-h-screen flex items-center justify-center py-20 relative">
    <div class="container mx-auto px-6 max-w-4xl">
      <div class="text-center mb-16">
        <h2 class="text-5xl md:text-6xl font-bold mb-6 text-gradient">Get In Touch</h2>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          Ready to start your next project? Let's create something amazing together.
        </p>
      </div>

      <!-- Contact form -->
      <div class="contact-form max-w-2xl mx-auto">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid md:grid-cols-2 gap-6">
            <div class="form-group">
              <label for="name" class="block text-gray-300 mb-2">Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                placeholder="Your Name"
              />
            </div>
            <div class="form-group">
              <label for="email" class="block text-gray-300 mb-2">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="subject" class="block text-gray-300 mb-2">Subject</label>
            <input
              id="subject"
              v-model="form.subject"
              type="text"
              required
              class="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
              placeholder="Project Inquiry"
            />
          </div>

          <div class="form-group">
            <label for="message" class="block text-gray-300 mb-2">Message</label>
            <textarea
              id="message"
              v-model="form.message"
              rows="6"
              required
              class="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors resize-none"
              placeholder="Tell me about your project..."
            ></textarea>
          </div>

          <div class="text-center">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else>Sending...</span>
            </button>
          </div>
        </form>

        <!-- Success message -->
        <div v-if="showSuccess" class="success-message mt-8 p-6 bg-green-500/20 border border-green-500 rounded-lg text-center">
          <h3 class="text-xl font-bold text-green-400 mb-2">Message Sent!</h3>
          <p class="text-gray-300">Thank you for your message. I'll get back to you soon.</p>
        </div>
      </div>

      <!-- Contact info -->
      <div class="mt-16 text-center">
        <div class="flex flex-wrap justify-center gap-8">
          <a href="mailto:hello@designer.com" class="contact-link text-gray-300 hover:text-primary transition-colors">
            hello@designer.com
          </a>
          <a href="tel:+1234567890" class="contact-link text-gray-300 hover:text-primary transition-colors">
            +1 (234) 567-890
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true

  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Reset form
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }

  isSubmitting.value = false
  showSuccess.value = true

  // Hide success message after 5 seconds
  setTimeout(() => {
    showSuccess.value = false
  }, 5000)
}

onMounted(() => {
  // Animate form elements
  const formGroups = document.querySelectorAll('.form-group')
  gsap.from(formGroups, {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-form',
      start: 'top 80%',
      once: true
    }
  })

  // Animate submit button
  const submitButton = document.querySelector('button[type="submit"]')
  if (submitButton) {
    gsap.from(submitButton, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      delay: 0.8,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 80%',
        once: true
      }
    })
  }
})
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(135deg, #FF6B6B, #4ECDC4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.contact-form {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.05);
  padding: 3rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-group label {
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 20px rgba(255, 107, 107, 0.2);
}

.contact-link {
  position: relative;
  text-decoration: none;
}

.contact-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-color);
  transition: width 0.3s ease;
}

.contact-link:hover::after {
  width: 100%;
}

.success-message {
  animation: slideInUp 0.5s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile responsive */
@media (max-width: 768px) {
  .contact-form {
    padding: 2rem 1.5rem;
  }
}
</style>