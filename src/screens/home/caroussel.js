import React from "react";
import { Carousel } from "react-responsive-carousel";

export default () => (
  <Carousel
    autoPlay
    className="carouselItems"
    showThumbs={false}
    showStatus={false}
  >
    {list &&
      list.map((el, index) => (
        <div className="item" key={index}>
          <img alt="" src={el.image} className="carouselImage" />
          <div
            style={{
              position: "absolute",
              color: "#fff",
              fontWeight: 600,
              top: "200px",
              left: "200px",
            }}
          >
            <h2 style={{ marginBottom: "8px", fontSize: "36px" }}>
              {el.title}
            </h2>
            <p style={{ fontSize: "30px" }}>{el.description}</p>
          </div>
        </div>
      ))}
  </Carousel>
);

const list = [
  {
    title: "Un Titre",
    description: "Une description",
    image: "http://lorempixel.com/output/cats-q-c-640-480-10.jpg",
  },
  {
    title: "Un Titre",
    description: "Une description",
    image: "http://lorempixel.com/output/cats-q-c-640-480-9.jpg",
  },
  {
    title: "Un Titre",
    description: "Une description",
    image: "http://lorempixel.com/output/cats-q-c-640-480-8.jpg",
  },
  {
    title: "Un Titre",
    description: "Une description",
    image: "http://lorempixel.com/output/cats-q-c-640-480-2.jpg",
  },
  {
    title: "Un Titre",
    description: "Une description",
    image: "http://lorempixel.com/output/cats-q-c-640-480-1.jpg",
  },
];
