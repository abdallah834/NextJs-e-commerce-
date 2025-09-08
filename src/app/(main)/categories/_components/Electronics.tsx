"use client";

import { IProduct } from "@/app/types/products.type";
import ProductCards from "../../products/_components/ProductCards";
import AnimatedContent from "@/app/_components/(animation)/AnimatedContent";

export default function Electronics({
  products,
}: {
  products: IProduct[] | undefined;
}) {
  const electronics = products?.filter(
    (product: IProduct) => product.category.name === "Electronics"
  );
  console.log(electronics);

  return (
    <>
      {electronics?.map((filteredProduct) => (
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
