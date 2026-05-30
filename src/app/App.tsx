import { useState, useRef, useCallback } from 'react';
import { Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import FloatingDecoration from './components/FloatingDecoration';
import ImageUpload from './components/ImageUpload';
import SettingsPanel from './components/SettingsPanel';
import Toast from './components/Toast';
import TapCounter from './components/TapCounter';
import ParticleEffect from './components/ParticleEffect';
import MusicControl from './components/MusicControl';

interface Particle {
  id: number;
  x: number;
  y: number;
  content: string;
  rotation: number;
  size: number;
  velocity: { x: number; y: number };
}

export default function App() {
  const [tapCount, setTapCount] = useState(0);
  const [isAngryMode, setIsAngryMode] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const [isBrownFilter, setIsBrownFilter] = useState(false);
  const particleIdRef = useRef(0);
  const toastIdRef = useRef(0);

  const getEmotionState = () => {
    if (isAngryMode) return 'angry';
    if (tapCount >= 500) return 'furious';
    if (tapCount >= 350) return 'angry';
    if (tapCount >= 200) return 'unhappy';
    if (tapCount >= 100) return 'sad';
    if (tapCount >= 40) return 'confused';
    return 'happy';
  };

  const getEmojiPool = () => {
    const emotion = getEmotionState();

    if (emotion === 'angry' || emotion === 'furious' || isAngryMode) {
      return ['😾', '😡', '💢', '👿', '🙄', '😤', '💥', '⚡'];
    }

    const baseEmojis = ['🥺', '😽', '👾', '🥰', '💖', '✨', '🌸', '🐱', '🎀', '💗', '☁️'];

    if (emotion === 'unhappy') {
      return [...baseEmojis, '😒', '😠', '😾', '😡'];
    }
    if (emotion === 'sad') {
      return [...baseEmojis, '🥲', '😿', '💧'];
    }
    if (emotion === 'confused') {
      return [...baseEmojis, '😳', '🤨', '🙃', '💦'];
    }

    return baseEmojis;
  };

  const getKaomojiPool = () => {
    const emotion = getEmotionState();

    if (emotion === 'angry' || emotion === 'furious' || isAngryMode) {
      return [
        '(｀⌒´メ)', '(▼ヘ▼#)', '(╬◣д◢)', '(　｀皿´)', '(ﾉ｀⊿´)ﾉ',
        '╰（‵□′）╯', '(＃｀д´)', '(`へ´*)ノ', '٩(╬ʘ益ʘ╬)۶', '(≖_≖ )'
      ];
    }

    const baseKaomoji = [
      '(≧▽≦)', '(ฅ\'ω\'ฅ)', '(｡･ω･｡)', '(´▽`)',
      '(๑>◡<๑)', '(♡˙︶˙♡)', '(｡- .•)', '(ˆつ⩊⊂ˆ)੭', '˵>ㅿ<˵'
    ];

    if (emotion === 'unhappy') {
      return [...baseKaomoji, '｢(ﾟﾍﾟ)', '(＊｀д´)', '（｀Δ´）ゞ'];
    }
    if (emotion === 'sad') {
      return [...baseKaomoji, '(⋟﹏⋞)', '(இωஇ )', '(｡ì _ í｡)'];
    }
    if (emotion === 'confused') {
      return [...baseKaomoji, '(・・?)', '(｡- .•)', '(ˆつ⩊⊂ˆ)੭'];
    }

    return baseKaomoji;
  };

  const showToast = useCallback((message: string) => {
    const id = toastIdRef.current++;
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const handleImageTap = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!uploadedImage) return;

    e.preventDefault();

    const newCount = tapCount + 1;
    setTapCount(newCount);

    const rect = e.currentTarget.getBoundingClientRect();
    let clientX: number;
    let clientY: number;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const emojiPool = getEmojiPool();
    const kaomojiPool = getKaomojiPool();
    const allContent = [...emojiPool, ...kaomojiPool];

    const particleCount = Math.floor(Math.random() * 3) + 3;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 3 + 2;

      newParticles.push({
        id: particleIdRef.current++,
        x,
        y,
        content: allContent[Math.floor(Math.random() * allContent.length)],
        rotation: Math.random() * 360,
        size: Math.random() * 1.5 + 1,
        velocity: {
          x: Math.cos(angle) * speed,
          y: Math.sin(angle) * speed
        }
      });
    }

    setParticles(prev => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 2000);

    if (newCount === 100) {
      showToast('要继续吗？');
    } else if (newCount === 200) {
      showToast('Ta好像有点累了！');
    } else if (newCount === 350) {
      showToast('TT');
    } else if (newCount === 500) {
      showToast('😾😾😾');
    } else if (newCount === 666) {
      showToast('你还真能戳阿…😾');
    } else if (newCount === 1000) {
      showToast('猫猫决定暂时不理你了。');
      setIsBrownFilter(true);
      setTimeout(() => setIsBrownFilter(false), 3000);
    }
  }, [uploadedImage, tapCount, isAngryMode, showToast]);

  const imageShake = tapCount >= 500 ? 'animate-shake' : '';
  const imageGlow = tapCount >= 500 ? 'shadow-[0_0_20px_rgba(255,100,100,0.6)]' : 'shadow-[0_0_15px_rgba(255,220,150,0.5)]';

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gradient-to-b from-[#FFFDF5] via-[#FFF7E8] to-[#FFEFCB] touch-none select-none">
      <FloatingDecoration />

      <button
        onClick={() => setShowSettings(true)}
        className="absolute top-4 left-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/60 backdrop-blur-sm shadow-lg hover:bg-white/80 transition-all"
      >
        <Settings className="w-5 h-5 text-[#8B6F47]" />
      </button>

      <div className="absolute top-4 right-4 z-20 text-xs text-[#8B6F47]/70 font-light">
        by 尤子
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-start px-6 pt-16">
        <h1 className="handwriting-font text-4xl font-bold text-[#8B6F47] mb-2">
          戳戳Ta吧！&gt;&lt;！
        </h1>

        <TapCounter count={tapCount} />

        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
          {!uploadedImage ? (
            <ImageUpload onImageUpload={setUploadedImage} />
          ) : (
            <div className="relative">
              <motion.div
                className={`relative cursor-pointer ${imageShake} touch-auto`}
                onClick={handleImageTap}
                onTouchStart={handleImageTap}
                animate={{
                  y: tapCount >= 500 ? [0, -3, 0] : tapCount >= 100 ? [0, -5, 0] : [0, -8, 0],
                }}
                transition={{
                  duration: tapCount >= 500 ? 0.3 : tapCount >= 100 ? 2 : 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div
                  className={`relative rounded-3xl overflow-hidden ${imageGlow} transition-all duration-500`}
                  style={{
                    width: '37.5vw',
                    maxWidth: '157px',
                    filter: isBrownFilter ? 'sepia(0.8) hue-rotate(-30deg) saturate(1.5)' : 'none',
                  }}
                >
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-auto object-cover"
                    style={{
                      clipPath: 'polygon(0 0, 100% 0, 100% 95%, 95% 100%, 0 100%)',
                    }}
                  />
                </div>
              </motion.div>

              <ParticleEffect particles={particles} />
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showSettings && (
          <SettingsPanel
            isAngryMode={isAngryMode}
            onToggleAngryMode={() => setIsAngryMode(!isAngryMode)}
            onClose={() => setShowSettings(false)}
          />
        )}
      </AnimatePresence>

      <div className="fixed top-20 right-4 z-30 flex flex-col gap-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
          />
        ))}
      </div>

      <MusicControl />
    </div>
  );
}