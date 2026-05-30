import { motion } from 'motion/react';

interface TapCounterProps {
  count: number;
}

const TapCounter = ({ count }: TapCounterProps) => {
  return (
    <motion.div
      key={count}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 0.3 }}
      className="text-center mb-8"
    >
      <p className="text-sm text-[#8B6F47]/70 font-light">
        今日戳戳次数
      </p>
      <p className="text-lg text-[#8B6F47] font-medium mt-1">
        戳：<span className="font-bold">{count}</span> 次
      </p>
    </motion.div>
  );
};

export default TapCounter;
