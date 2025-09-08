import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCards from "./ProductCards";
import { IProduct } from "@/app/types/products.type";

export default function RelatedProducts({
  products,
  id,
}: {
  products: [];
  id: string;
}) {
  return (
    <>
      <section className="container mx-auto mt-25 mb-15">
        <div>
          <span className="block text-3xl mb-12 ms-15 border-b-2 border-zinc-300 w-fit pb-3">
            Related Products:
          </span>
          <div className="mx-15">
            <Carousel>
              <CarouselContent>
                {products.map(
                  (product: IProduct) =>
                    id !== product.id && (
                      <CarouselItem
                        key={product.id}
                        className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
                      >
                        <ProductCards product={product} />
                      </CarouselItem>
                    )
                )}
              </CarouselContent>
              <CarouselNext />
              <CarouselPrevious />
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
}
