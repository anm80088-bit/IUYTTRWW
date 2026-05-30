import { useRef } from 'react';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImageUpload = ({ onImageUpload }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageUpload(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onImageUpload(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-sm">
      <p className="text-center text-[#8B6F47] mb-4 font-medium">
        导入图片↓
      </p>
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="relative border-2 border-dashed border-[#FFD699] bg-[#FFF9E6] rounded-3xl p-12 cursor-pointer hover:bg-[#FFF5D6] transition-all flex flex-col items-center justify-center gap-3"
      >
        <Upload className="w-12 h-12 text-[#FFB366]" />
        <p className="text-sm text-[#8B6F47]/70 text-center">
          点击上传或拖拽图片
        </p>
        <p className="text-xs text-[#8B6F47]/50">
          支持 PNG / JPG
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
