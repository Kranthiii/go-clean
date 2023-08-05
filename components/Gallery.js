import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const Gallery = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/g-1.jpg"
          alt="First slide"
          style={{ height: "450px", width: "200px" }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/g-2.jpg"
          alt="Second slide"
          style={{ height: "450px", width: "200px" }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/g-3.jpg"
          alt="Third slide"
          style={{ height: "450px", width: "200px" }}
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Gallery;
