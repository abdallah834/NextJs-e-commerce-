// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import Autoplay from "embla-carousel-autoplay";
// import Image from "next/image";
import { IFeaturedImages, IProduct } from "@/app/types/products.type";
import { getAllBrands } from "@/lib/services/brands";
import { getAllCategories } from "@/lib/services/categories";
import { getAllProducts } from "@/lib/services/products";
import { Suspense } from "react";
import AllCategories from "./(main)/products/_components/AllCategories";
import ProductCardsContainer from "./(main)/products/_components/ProductCardsContainer";
import ProductsSkeleton from "./(main)/products/_components/ProductsSkeleton";
import LogoLoop from "./_components/(animation)/LogoLoop";
import MainCarousel from "./_components/MainCarousel";
export default async function Home() {
  const products = await getAllProducts();
  const allBrands = await getAllBrands();
  // const metaData = data?.metadata;
  const allCategories = await getAllCategories();
  // const { getUserCart } = useCart();
  const imgsArr: IFeaturedImages[] = [];
  const imageLogos = allBrands?.data.map((brand: IProduct, index: number) => {
    imgsArr.push({
      brand: products[index]?.brand?.name,
      alt: "Featured Companies",
      src: allBrands.data[index].image,
    });
  });

  return (
    <main className="container mx-auto">
      <div
        style={{ height: "130px", position: "relative", overflow: "hidden" }}
        className="mt-8"
      >
        <LogoLoop
          logos={imgsArr}
          speed={120}
          direction="left"
          logoHeight={60}
          gap={40}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Our partners"
        />
      </div>
      <div className="flex items-center justify-center mt-6">
        <MainCarousel />
      </div>
      <AllCategories categories={allCategories} />
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductCardsContainer products={products} />
      </Suspense>
    </main>
  );
}
