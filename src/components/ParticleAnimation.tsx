import { useEffect } from 'react'

export default function ParticleAnimation() {
  useEffect(() => {
    const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')
    let animationFrameId: number

    const particles: { x: number; y: number; radius: number; vx: number; vy: number }[] = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
      }
    }

    const initParticles = () => {
      for (let i = 0; i < 100; i++) {
        particles.push(createParticle())
      }
    }

    const drawParticles = () => {
      ctx!.clearRect(0, 0, canvas.width, canvas.height)
      ctx!.fillStyle = 'rgba(255, 255, 255, 0.5)'
      particles.forEach(particle => {
        ctx!.beginPath()
        ctx!.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx!.fill()

        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx = -particle.vx
        if (particle.y < 0 || particle.y > canvas.height) particle.vy = -particle.vy
      })
    }

    const animate = () => {
      drawParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initParticles()
    animate()

    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas id="particle-canvas" className="absolute inset-0" />
}