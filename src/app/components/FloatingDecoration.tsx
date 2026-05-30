import { motion } from 'motion/react';

const FloatingDecoration = () => {
  const flowers = ['🌸', '🌼', '🌺', '✨', '⭐', '💫'];

  const decorations = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    icon: flowers[Math.floor(Math.random() * flowers.length)],
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
    size: 0.8 + Math.random() * 0.7,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {decorations.map((deco) => (
        <motion.div
          key={deco.id}
          className="absolute"
          style={{
            left: deco.left,
            top: deco.top,
            fontSize: `${deco.size}rem`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: deco.duration,
            repeat: Infinity,
            delay: deco.delay,
            ease: "easeInOut",
          }}
        >
          {deco.icon}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingDecoration;
