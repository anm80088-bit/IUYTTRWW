import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MusicControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // 注意：需要添加实际的音频文件
  // 建议使用八音盒、Lo-fi Cute或温柔钢琴风格的音乐
  // 可以在 public 文件夹中添加音频文件，然后使用 Audio API 播放

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
    // TODO: 实现音频播放/暂停
    // const audio = new Audio('/background-music.mp3');
    // if (isPlaying) {
    //   audio.pause();
    // } else {
    //   audio.play();
    // }
  };

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-30 w-14 h-14 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white transition-all hover:scale-110"
      aria-label={isPlaying ? '暂停音乐' : '播放音乐'}
    >
      {isPlaying ? (
        <Volume2 className="w-6 h-6 text-[#8B6F47]" />
      ) : (
        <VolumeX className="w-6 h-6 text-[#8B6F47]/50" />
      )}
    </button>
  );
};

export default MusicControl;
