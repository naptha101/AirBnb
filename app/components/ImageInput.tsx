"use client"
import { useState } from 'react';
import { Camera } from 'lucide-react';
import { Input } from '@/components/ui/input';




function ImageInput() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e:any) => {
    const file = e.target.files[0];
    // Perform any additional validation if needed
    setImage(file);
  };

  return (
    <div className='flex flex-col gap-y-2'>
    <label className='text-[18px]'>Image</label>
    <label className="flex items-center gap-x-2 cursor-pointer">
      <Camera size={24} />
      <span>Choose Image</span>
      <input name='Image' type='file' onChange={handleImageChange} style={{ display: 'none' }} required min={10} />
    </label>
  </div>
  );
}

export default ImageInput;
