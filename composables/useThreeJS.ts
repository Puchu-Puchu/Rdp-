import * as THREE from 'three'
import { ref, onMounted, onUnmounted } from 'vue'

export const useThreeJS = () => {
  const scene = ref<THREE.Scene | null>(null)
  const camera = ref<THREE.PerspectiveCamera | null>(null)
  const renderer = ref<THREE.WebGLRenderer | null>(null)
  const particles = ref<THREE.Points | null>(null)
  const animationId = ref<number | null>(null)
  const mousePosition = ref({ x: 0, y: 0 })

  let mouseListener: ((event: MouseEvent) => void) | null = null
  let touchListener: ((event: TouchEvent) => void) | null = null
  let resizeListener: (() => void) | null = null

  const initParticles = (canvas: HTMLCanvasElement, options = {}) => {
    if (!process.client) return null

    const {
      particleCount = 1000,
      particleSize = 2,
      particleColor = 0x4ECDC4,
      connectionDistance = 150,
      mouseInfluenceRadius = 200,
      mouseInfluenceStrength = 0.03
    } = options

    // Scene setup
    scene.value = new THREE.Scene()

    // Camera setup
    camera.value = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.value.position.z = 500

    // Renderer setup
    renderer.value = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    })
    renderer.value.setSize(window.innerWidth, window.innerHeight)
    renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 1000
      positions[i + 1] = (Math.random() - 0.5) * 1000
      positions[i + 2] = (Math.random() - 0.5) * 1000

      velocities[i] = (Math.random() - 0.5) * 0.5
      velocities[i + 1] = (Math.random() - 0.5) * 0.5
      velocities[i + 2] = (Math.random() - 0.5) * 0.5
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3))

    // Particle material
    const particlesMaterial = new THREE.PointsMaterial({
      color: particleColor,
      size: particleSize,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    particles.value = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.value.add(particles.value)

    // Create lines between nearby particles
    const linesMaterial = new THREE.LineBasicMaterial({
      color: particleColor,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending
    })

    const linesGeometry = new THREE.BufferGeometry()
    const linesPositions = new Float32Array(particleCount * 6) // Max connections per particle
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linesPositions, 3))

    const lines = new THREE.LineSegments(linesGeometry, linesMaterial)
    scene.value.add(lines)

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.value.x = (event.clientX / window.innerWidth) * 2 - 1
      mousePosition.value.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0]
        mousePosition.value.x = (touch.clientX / window.innerWidth) * 2 - 1
        mousePosition.value.y = -(touch.clientY / window.innerHeight) * 2 + 1
      }
    }

    // Window resize handler
    const handleResize = () => {
      if (camera.value && renderer.value) {
        camera.value.aspect = window.innerWidth / window.innerHeight
        camera.value.updateProjectionMatrix()
        renderer.value.setSize(window.innerWidth, window.innerHeight)
      }
    }

    // Animation loop
    const animate = () => {
      animationId.value = requestAnimationFrame(animate)

      if (particles.value && scene.value) {
        const positions = particles.value.geometry.attributes.position.array as Float32Array
        const velocities = particles.value.geometry.attributes.velocity.array as Float32Array

        // Update particle positions
        for (let i = 0; i < particleCount * 3; i += 3) {
          // Mouse interaction
          const dx = mousePosition.value.x * 500 - positions[i]
          const dy = mousePosition.value.y * 500 - positions[i + 1]
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouseInfluenceRadius) {
            const force = (1 - distance / mouseInfluenceRadius) * mouseInfluenceStrength
            positions[i] += dx * force
            positions[i + 1] += dy * force
          }

          // Update velocities with damping
          velocities[i] *= 0.99
          velocities[i + 1] *= 0.99
          velocities[i + 2] *= 0.99

          // Apply velocities
          positions[i] += velocities[i]
          positions[i + 1] += velocities[i]
          positions[i + 2] += velocities[i]

          // Boundary check
          if (Math.abs(positions[i]) > 500) velocities[i] *= -1
          if (Math.abs(positions[i + 1]) > 500) velocities[i + 1] *= -1
          if (Math.abs(positions[i + 2]) > 500) velocities[i + 2] *= -1
        }

        particles.value.geometry.attributes.position.needsUpdate = true

        // Update lines between nearby particles
        const linesPositions = lines.geometry.attributes.position.array as Float32Array
        let lineIndex = 0

        for (let i = 0; i < particleCount; i++) {
          for (let j = i + 1; j < particleCount; j++) {
            const dx = positions[i * 3] - positions[j * 3]
            const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
            const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

            if (distance < connectionDistance && lineIndex < linesPositions.length - 6) {
              linesPositions[lineIndex++] = positions[i * 3]
              linesPositions[lineIndex++] = positions[i * 3 + 1]
              linesPositions[lineIndex++] = positions[i * 3 + 2]
              linesPositions[lineIndex++] = positions[j * 3]
              linesPositions[lineIndex++] = positions[j * 3 + 1]
              linesPositions[lineIndex++] = positions[j * 3 + 2]
            }
          }
        }

        lines.geometry.attributes.position.needsUpdate = true
        lines.geometry.setDrawRange(0, lineIndex / 3)

        // Rotate particles slowly
        particles.value.rotation.y += 0.001
        lines.rotation.y += 0.001

        renderer.value?.render(scene.value, camera.value)
      }
    }

    // Event listeners
    mouseListener = handleMouseMove
    touchListener = handleTouchMove
    resizeListener = handleResize

    window.addEventListener('mousemove', mouseListener)
    window.addEventListener('touchmove', touchListener)
    window.addEventListener('resize', resizeListener)

    animate()

    return {
      scene: scene.value,
      camera: camera.value,
      renderer: renderer.value,
      particles: particles.value
    }
  }

  const destroyParticles = () => {
    if (animationId.value) {
      cancelAnimationFrame(animationId.value)
    }

    if (mouseListener) {
      window.removeEventListener('mousemove', mouseListener)
    }
    if (touchListener) {
      window.removeEventListener('touchmove', touchListener)
    }
    if (resizeListener) {
      window.removeEventListener('resize', resizeListener)
    }

    if (renderer.value) {
      renderer.value.dispose()
    }

    if (particles.value) {
      particles.value.geometry.dispose()
      ;(particles.value.material as THREE.Material).dispose()
    }

    scene.value?.clear()

    // Reset refs
    scene.value = null
    camera.value = null
    renderer.value = null
    particles.value = null
    animationId.value = null
  }

  return {
    initParticles,
    destroyParticles,
    mousePosition: readonly(mousePosition)
  }
}