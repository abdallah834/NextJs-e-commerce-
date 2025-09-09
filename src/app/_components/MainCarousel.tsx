"use client";
import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Arrow from "./Arrow";

export default function MainCarousel() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <Arrow />,
    previousArrow: <Arrow />,
  };
  return (
    <Slider
      {...settings}
      className="w-[325px] min-[424]:w-[410px] min-[469px]:w-[450px] sm:w-xl md:w-2xl lg:w-4xl xl:w-6xl"
    >
      <div>
        <Image
          loading="lazy"
          src={"/carousel_img_1.jpeg"}
          alt="first carousel image"
          width={1500}
          height={700}
          className="rounded-4xl"
        />
      </div>
      <div>
        <Image
          loading="lazy"
          src={"/carousel_img_2.jpeg"}
          alt="first carousel image"
          width={1500}
          height={700}
          className="rounded-4xl"
        />
      </div>
    </Slider>
  );
}
