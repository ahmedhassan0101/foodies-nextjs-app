"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import classes from "./image-slideshow.module.css";

// Images are served from /public/assets/ — Next.js serves this folder
// statically with no imports needed. Just use the path string directly.
const images = [
  { src: "/burger.jpg", alt: "A delicious, juicy burger" },
  { src: "/curry.jpg", alt: "A delicious, spicy curry" },
  { src: "/dumplings.jpg", alt: "Steamed dumplings" },
  { src: "/macncheese.jpg", alt: "Mac and cheese" },
  { src: "/pizza.jpg", alt: "A delicious pizza" },
  { src: "/schnitzel.jpg", alt: "A delicious schnitzel" },
  { src: "/tomato-salad.jpg", alt: "A delicious tomato salad" },
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          width={1024}
          height={768}
          className={index === currentImageIndex ? classes.active : ""}
          alt={image.alt}
        />
      ))}
    </div>
  );
}
