"use client";
import { IProduct } from "@/app/types/products.type";
import ProductCards from "../../products/_components/ProductCards";
import AnimatedContent from "@/app/_components/(animation)/AnimatedContent";
export default function WomenFashion({
  products,
}: {
  products: IProduct[] | undefined;
}) {
  const womenCategory = products?.filter(
    (product: IProduct) => product.category.name === "Women's Fashion"
  );
  return (
    <>
      {womenCategory?.map((filteredProduct) => (
        <AnimatedContent
          distance={180}
          direction="vertical"
          reverse={false}
          duration={1.2}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.1}
          delay={0}
          key={filteredProduct.id}
        >
          <ProductCards product={filteredProduct} />
        </AnimatedContent>
      ))}
    </>
  );
}
