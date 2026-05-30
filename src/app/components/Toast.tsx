import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast = ({ message, onClose }: ToastProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="bg-[#FFF9E6] border-2 border-[#FFD699] rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3 min-w-[200px]"
    >
      <span className="text-[#8B6F47] text-sm flex-1">{message}</span>
      <button
        onClick={onClose}
        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#FFE8CC] transition-colors flex-shrink-0"
      >
        <X className="w-4 h-4 text-[#8B6F47]" />
      </button>
    </motion.div>
  );
};

export default Toast;
