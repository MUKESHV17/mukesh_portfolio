import React, { useEffect, useRef } from 'react';

const ParticlesBg = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particlesArray = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const handleMouseMove = (event) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle constructor
    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      // Draw single particle
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for line drawing
      }

      // Update particle position and react to cursor proximity
      update() {
        // Bounce off canvas boundaries
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        // Check cursor attraction proximity
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          let dx = mouseRef.current.x - this.x;
          let dy = mouseRef.current.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > 0 && distance < mouseRef.current.radius) {
            // Drifts gently towards mouse
            const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
            this.x += (dx / distance) * force * 1.8;
            this.y += (dy / distance) * force * 1.8;
          }
        }

        // Apply normal drift
        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
      }
    }

    // Initialize particle pool
    const init = () => {
      particlesArray = [];
      // Calculate count based on viewport area (density optimized)
      const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);

      const colors = [
        'rgba(0, 245, 255, 0.45)',  // Neon Cyan
        'rgba(255, 0, 127, 0.35)',  // Neon Magenta
        'rgba(57, 255, 20, 0.25)'   // Neon Green
      ];

      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        const directionX = (Math.random() * 0.4) - 0.2;
        const directionY = (Math.random() * 0.4) - 0.2;
        const color = colors[Math.floor(Math.random() * colors.length)];

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    };

    // Draw neural connection web lines
    const connect = () => {
      let opacityValue = 1;
      const maxDistance = 110;

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            opacityValue = 1 - (distance / maxDistance);
            
            // Faint matching gradient lines
            ctx.strokeStyle = `rgba(0, 245, 255, ${opacityValue * 0.08})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full bg-[#030014]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default ParticlesBg;
