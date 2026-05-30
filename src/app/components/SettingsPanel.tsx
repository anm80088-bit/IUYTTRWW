import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface SettingsPanelProps {
  isAngryMode: boolean;
  onToggleAngryMode: () => void;
  onClose: () => void;
}

const SettingsPanel = ({ isAngryMode, onToggleAngryMode, onClose }: SettingsPanelProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 w-[85vw] max-w-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#8B6F47]">⚙️ 设置</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#FFE8CC] transition-colors"
          >
            <X className="w-5 h-5 text-[#8B6F47]" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-[#8B6F47] font-medium mb-3">情绪模式</p>
            <div className="space-y-2">
              <button
                onClick={() => !isAngryMode && onToggleAngryMode()}
                className={`w-full p-4 rounded-2xl flex items-center gap-3 transition-all ${
                  !isAngryMode
                    ? 'bg-[#FFE8CC] border-2 border-[#FFB366]'
                    : 'bg-white/50 border-2 border-transparent hover:bg-white/80'
                }`}
              >
                <span className="text-2xl">💕</span>
                <span className="text-[#8B6F47] font-medium">普通模式</span>
              </button>
              <button
                onClick={() => isAngryMode && onToggleAngryMode()}
                className={`w-full p-4 rounded-2xl flex items-center gap-3 transition-all ${
                  isAngryMode
                    ? 'bg-[#FFE8CC] border-2 border-[#FFB366]'
                    : 'bg-white/50 border-2 border-transparent hover:bg-white/80'
                }`}
              >
                <span className="text-2xl">😾</span>
                <span className="text-[#8B6F47] font-medium">生气模式</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SettingsPanel;
