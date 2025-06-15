import React from "react";

const ImageGallery = ({ carDetails }) => {
  return (
    <div>
      <img
        src={carDetails?.images[0]?.imageUrl}
        alt=""
        className="w-full md:h-[400px]  object-cover rounded-xl"
      />
    </div>
  );
};

export default ImageGallery;
