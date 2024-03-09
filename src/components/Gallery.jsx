import React, { useEffect, useState } from "react";

const Gallery = ({ productInfo }) => {
  const { thumbnail, images = [] } = productInfo;

  const [currentImage, setCurrentImage] = useState(thumbnail);
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    setCurrentImage(thumbnail);
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

        <div className="flex flex-wrap thumbnails">
          {allImages.map((th, index) => {
            return (
              <div
                className="img-holder"
                key={index}
                onClick={(e) => {
                  handleClick(index);
                }}
              >
                <img src={th} alt={`product-${index + 1}`} />
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default Gallery;
