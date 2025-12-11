'use client';

import * as React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

// Animated Grid Pattern Background
export function AnimatedGridPattern({
  className,
  numSquares = 30,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
}) {
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const numCols = Math.ceil(dimensions.width / 40);
  const numRows = Math.ceil(dimensions.height / 40);

  const getRandomSquares = () => {
    const squares = [];
    for (let i = 0; i < numSquares; i++) {
      squares.push({
        id: i,
        pos: [
          Math.floor(Math.random() * numCols),
          Math.floor(Math.random() * numRows),
        ],
      });
    }
    return squares;
  };

  const [squares, setSquares] = React.useState(getRandomSquares);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSquares(getRandomSquares());
    }, duration * 1000);
    return () => clearInterval(interval);
  }, [numCols, numRows, duration]);

  return (
    <svg
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full fill-primary-500/30 stroke-primary-500/30',
        className
      )}
    >
      <defs>
        <pattern
          id="animated-grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#animated-grid)" />
      {squares.map(({ id, pos }) => (
        <motion.rect
          key={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: maxOpacity }}
          transition={{
            duration,
            repeat: Infinity,
            delay: Math.random() * duration,
            repeatType: 'reverse',
          }}
          width="40"
          height="40"
          x={pos[0] * 40}
          y={pos[1] * 40}
          fill="currentColor"
          strokeWidth="0"
        />
      ))}
    </svg>
  );
}

// Particles Background
export function ParticlesBackground({
  className,
  particleCount = 50,
  particleColor = 'rgba(0, 212, 255, 0.5)',
}) {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    });

    const init = () => {
      particles = Array.from({ length: particleCount }, createParticle);
    };

    const drawParticle = (p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = particleColor.replace('0.5', String(p.opacity));
      ctx.fill();
    };

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.beginPath();
            ctx.strokeStyle = particleColor.replace('0.5', String(0.1 * (1 - dist / 150)));
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        drawParticle(p);
      });

      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    init();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, particleColor]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('pointer-events-none fixed inset-0', className)}
    />
  );
}

// Spotlight Effect
export function Spotlight({ className, fill = 'rgba(0, 212, 255, 0.15)' }) {
  const divRef = React.useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (!divRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={divRef}
      className={cn(
        'pointer-events-none fixed inset-0 z-30 transition duration-300',
        className
      )}
      style={{
        background: useMotionTemplate`
          radial-gradient(
            600px circle at ${mouseX}px ${mouseY}px,
            ${fill},
            transparent 80%
          )
        `,
      }}
    />
  );
}

// Meteors Effect
export function Meteors({ number = 20, className }) {
  const meteors = React.useMemo(() => {
    return Array.from({ length: number }).map((_, idx) => ({
      id: idx,
      left: Math.floor(Math.random() * 100) + '%',
      delay: Math.random() * 2 + 's',
      duration: Math.floor(Math.random() * 8 + 2) + 's',
    }));
  }, [number]);

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="absolute top-1/2 left-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-primary-400 shadow-[0_0_0_1px_#ffffff10]"
          style={{
            left: meteor.left,
            animationDelay: meteor.delay,
            animationDuration: meteor.duration,
          }}
        >
          <span className="absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-[50%] bg-gradient-to-r from-primary-400 to-transparent" />
        </span>
      ))}
    </div>
  );
}

// Aurora Background
export function AuroraBackground({ className, children }) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 212, 255, 0.15), transparent),
            radial-gradient(ellipse 60% 40% at 80% 50%, rgba(255, 0, 64, 0.1), transparent),
            radial-gradient(ellipse 50% 30% at 20% 80%, rgba(0, 212, 255, 0.1), transparent)
          `,
        }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 50% 50%, rgba(0, 212, 255, 0.2), transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(255, 0, 64, 0.15), transparent 50%)
          `,
          backgroundSize: '200% 200%',
        }}
      />
      {children}
    </div>
  );
}
