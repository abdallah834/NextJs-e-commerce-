"use client";
import { IProduct } from "@/app/types/products.type";
import ProductCards from "./ProductCards";

export default function ProductCardsContainer({
  products,
}: {
  products: IProduct[] | undefined;
}) {
  return (
    <>
      <section>
        <div className="flex justify-center mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 min-[360px]:w-xs min-[500px]:w-md sm:w-xl md:w-2xl lg:w-6xl">
            {/* when using {} with an arrow function make sure to return the needed result */}
            {products?.map((product: IProduct) => {
              return <ProductCards key={product?.id} product={product} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
}
