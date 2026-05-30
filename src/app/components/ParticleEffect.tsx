import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  content: string;
  rotation: number;
  size: number;
  velocity: { x: number; y: number };
}

interface ParticleEffectProps {
  particles: Particle[];
}

const ParticleEffect = ({ particles }: ParticleEffectProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: particle.x,
            top: particle.y,
            fontSize: `${particle.size}rem`,
          }}
          initial={{
            opacity: 1,
            scale: 0,
            rotate: particle.rotation,
          }}
          animate={{
            opacity: 0,
            scale: 1.5,
            x: particle.velocity.x * 60,
            y: particle.velocity.y * 60,
            rotate: particle.rotation + (Math.random() > 0.5 ? 360 : -360),
          }}
          transition={{
            duration: 1.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
        >
          {particle.content}
        </motion.div>
      ))}
    </div>
  );
};

export default ParticleEffect;
