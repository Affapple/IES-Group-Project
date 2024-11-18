import React from 'react';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <section className="grid grid-cols-3 grid-rows-1 gap-2 p-2">
      <img src={images[0]} alt="FrameImage" className="col-span-4 row-span-1 object-cover w-full h-full" />
    </section>
  );
};

export default ImageGallery;