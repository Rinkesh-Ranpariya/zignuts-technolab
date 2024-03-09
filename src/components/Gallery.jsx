import React, { useEffect, useState } from "react";

const Gallery = ({ productInfo }) => {
  const { images = [] } = productInfo;

  const [currentImage, setCurrentImage] = useState(images[0]);
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    setAllImages(images);
  }, [productInfo]);

  const handleClick = (index) => {
    setCurrentImage(allImages[index]);
  };

  return (
    <section className="gallery-holder hide-in-mobile">
      <section className="gallery">
        <div className="shadow-md image">
          <img src={currentImage} alt="product" />
        </div>

        <div className="flex flex-wrap items-center gap-5">
          {allImages.map((th, index) => {
            return (
              <div
                className={`${
                  th === currentImage
                    ? "rounded-xl border-4 border-sky-500"
                    : ""
                } w-16 md:w-24 h-16 md:h-24`}
                key={index}
                onClick={(e) => {
                  handleClick(index);
                }}
              >
                <img
                  src={th}
                  alt={`product-${index + 1}`}
                  className="cursor-pointer rounded-xl h-full"
                />
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default Gallery;
