"use client";

import Arrow from "@/app/_components/Arrow";
import { ICategories } from "@/app/types/products.type";
import Image from "next/image";
import Slider from "react-slick";

export default function AllCategories({
  categories,
}: {
  categories: { data: [] };
}) {
  const { data } = categories;
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <Arrow />,
    previousArrow: <Arrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto min-[600px]:w-md sm:w-xl md:w-2xl lg:w-4xl xl:w-5xl 2xl:w-6xl mt-15">
      <Slider {...settings} className="w-1/1">
        {data.map((category: ICategories) => (
          <div key={category._id} className="w-fit max-h-40 pe-3">
            <Image
              loading="lazy"
              src={`${category?.image}`}
              alt="category image"
              width={500}
              height={500}
              className="aspect-square object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
