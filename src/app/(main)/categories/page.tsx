"use client";
import AnimatedContent from "@/app/_components/(animation)/AnimatedContent";
import { IProduct } from "@/app/types/products.type";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAllProducts } from "@/lib/services/products";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import ProductCardsContainer from "../products/_components/ProductCardsContainer";
import Electronics from "./_components/Electronics";
import MenFashion from "./_components/MenFashion";
import WomenFashion from "./_components/WomenFashion";

export default function page() {
  const [category, setCategory] = useState<string | undefined>();
  const [products, setAllProducts] = useState<IProduct[] | undefined>();
  const [key, setKey] = useState(0);
  useEffect(() => {
    async function getProductsInit() {
      const data = await getAllProducts();
      return setAllProducts(data);
    }
    getProductsInit();
  }, []);
  console.log(products);

  return (
    <>
      <div className="container mx-auto flex flex-wrap gap-4 mt-19 justify-center">
        <AnimatedContent
          distance={220}
          direction="vertical"
          reverse={false}
          duration={1.2}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.1}
          delay={0}
        >
          <Card
            className="min-[340px]:w-[300px] min-[440px]:w-[340px] sm:w-3xs md:w-xs lg:w-sm xl:w-sm border-3 bg-linear-313 from-white from-47% to-white to-120% via-black via-40% border-black transition-all duration-300 cursor-pointer hover:scale-101 hover:shadow-[-20px_25px_35px_rgba(0,0,0,0.55)]"
            onClick={() => setCategory("Women's Fashion")}
          >
            <CardHeader className="font-semibold text-lg text-white">
              Women's Fashion
            </CardHeader>
            <CardContent className="flex justify-center">
              <Image
                src={"/women's_Fashion.jpeg"}
                alt="women's fashion image"
                width={330}
                height={120}
                className="aspect-square object-cover rounded-lg"
                loading="lazy"
              />
            </CardContent>
          </Card>
        </AnimatedContent>

        <AnimatedContent
          distance={220}
          direction="vertical"
          reverse={false}
          duration={1.2}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.1}
          delay={0.2}
        >
          <Card
            className="min-[340px]:w-[300px] min-[440px]:w-[340px] sm:w-3xs md:w-xs lg:w-sm border-3 bg-linear-130 from-white from-50% to-white to-120% via-black via-40% border-black transition-all duration-300 cursor-pointer hover:scale-103 hover:shadow-[0_25px_35px_rgba(0,0,0,0.55)]"
            onClick={() => setCategory("Men's Fashion")}
          >
            <CardHeader className="font-semibold text-lg">
              Men's wear
            </CardHeader>
            <CardContent className="flex justify-center">
              <Image
                src={"/men's_Wear.jpeg"}
                alt="women's fashion image"
                width={330}
                height={180}
                className="aspect-square object-center rounded-lg object-cover"
                loading="lazy"
              />
            </CardContent>
          </Card>
        </AnimatedContent>
        <AnimatedContent
          distance={220}
          direction="vertical"
          reverse={false}
          duration={1.2}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.1}
          delay={0.4}
        >
          <Card
            className="min-[340px]:w-[300px] min-[440px]:w-[340px] sm:w-3xs md:w-xs lg:w-sm border-3 bg-linear-233 from-white from-53% to-white to-120% via-black via-40% border-black transition-all duration-300 cursor-pointer hover:scale-103 hover:shadow-[35px_25px_35px_rgba(0,0,0,0.55)]"
            onClick={() => setCategory("Electronics")}
          >
            <CardHeader className="font-semibold text-lg ps-10">
              Electronics
            </CardHeader>
            <CardContent className="flex justify-center">
              <Image
                src={"/electronics.jpeg"}
                alt="women's fashion image"
                width={330}
                height={180}
                className="aspect-square object-center rounded-lg object-cover"
                loading="lazy"
              />
            </CardContent>
          </Card>
        </AnimatedContent>
      </div>
      <div className=" flex justify-center">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 space-x-3 mt-10 space-y-3 min-[360px]:w-xs min-[500px]:w-md sm:w-xl md:w-2xl lg:w-6xl">
          {category === "Women's Fashion" ? (
            <WomenFashion products={products} />
          ) : category === "Men's Fashion" ? (
            <MenFashion products={products} />
          ) : category === "Electronics" ? (
            <Electronics products={products} />
          ) : null}
          {/* <ProductCardsContainer
          products={
            filteredProducts === undefined ? products : filteredProducts
          }
        /> */}
        </div>
      </div>
    </>
  );
}
