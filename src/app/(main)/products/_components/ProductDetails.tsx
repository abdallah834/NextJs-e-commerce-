"use client";
import { IProduct } from "@/app/types/products.type";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Button } from "@/components/ui/button";
import { getSessionToken } from "@/lib/server-utils";
import { addToCart, getCartData } from "@/lib/services/cart";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/app/(context)/CartContextProvider";

export default function ProductDetails({ product }: { product: IProduct }) {
  const data = product;
  const { getUserCart } = useCart();

  const router = useRouter();
  const { status: userStatus } = useSession();
  async function handleAddToCart(productId: string) {
    if (userStatus === "authenticated") {
      // having await inside of the toast.promise doesn't display loading message therefore await should be with the toast.promise
      await toast.promise(addToCart(productId), {
        loading: "Adding product to cart",
        success: "Product added",
        error: "Failed to add product",
      });
      await getUserCart();
    } else if (userStatus === "unauthenticated") {
      // always make sure to import from next/navigation
      router.push("/auth/login");
    }
  }

  return (
    <>
      <div className="container mx-auto mt-10 flex flex-col min-[1100px]:flex-row justify-center gap-24 items-center">
        <Carousel
          className="flex justify-center items-center min-[1025px]:w-1/3  xl:w-md"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent className="min-[382px]:w-sm">
            {data.images.map((img, index) => (
              <CarouselItem key={index} className="flex justify-center">
                <Image
                  src={img}
                  alt="product image"
                  width={500}
                  height={400}
                  loading="lazy"
                  className="cursor-grab hover:scale-110 transition-all duration-300 min-[382px]:w-xs sm:w-md"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {/********************* Details ********************/}
        <div className="flex flex-col gap-8 w-xs min-[540px]:w-md sm:w-xl">
          {/********************* Title ********************/}
          <h3 className="text-3xl uppercase font-semibold tracking-wide">
            {data.title}
          </h3>
          {/********************* Rating ********************/}
          <div className="flex items-center">
            <span className="block">
              {Array.from({ length: data.ratingsAverage }).map((_, index) => (
                <Icon
                  key={index}
                  icon="ic:round-star-rate"
                  className="text-amber-400 text-4xl"
                />
              ))}
              {(data.ratingsAverage >= 1.5 && data.ratingsAverage < 2) ||
              (data.ratingsAverage >= 2.5 && data.ratingsAverage < 3) ||
              (data.ratingsAverage >= 3.5 && data.ratingsAverage < 4) ||
              (data.ratingsAverage >= 4.5 && data.ratingsAverage < 5) ? (
                <Icon
                  icon="material-symbols:star-rate-half-rounded"
                  className="text-amber-400 text-4xl"
                />
              ) : null}
            </span>
            <span className="text-xl ms-2 mb-2 font-semibold">{`${data.ratingsAverage}/5`}</span>
            <span className="text-sm min-[360px]:text-xs min-[540px]:text-sm sm:text-md ms-3 mb-2 font-semibold text-zinc-400">{`(${data.ratingsQuantity} reviews) `}</span>
          </div>
          {/********************* Price ********************/}
          <span className="block text-3xl font-bold">{`${data.price} EGP`}</span>
          {/********************* Description ********************/}
          <span className="block text-xl ms-2 font-semibold">Description:</span>
          <p className="font-semibold mb-2 text-center">{data.description}</p>
          {/********************* Stock info ********************/}
          <div className="flex justify-around bg-zinc-100 p-4 rounded-full">
            <div className="stocks-container flex items-center gap-5">
              <Icon icon="vaadin:stock" className="text-zinc-600 text-3xl" />
              <div>
                <span className="block text-zinc-600">Available stock</span>
                <span className="block">{`${data.quantity} Units`}</span>
              </div>
            </div>
            <div className="stocks-container flex items-center gap-3">
              <Icon
                icon="stash:chart-trend-up"
                className="text-zinc-600 text-5xl"
              />
              <div>
                <span className="block text-zinc-600">Total sold</span>
                <span className="block break-all">{`${
                  data.sold === null ? `0 Units` : `${data.sold} Units`
                }`}</span>
              </div>
            </div>
          </div>
          {/********************* Brand & Category ********************/}
          <div className="flex justify-between items-center flex-col lg:flex-col gap-4">
            <div className="brand-category flex items-center flex-col lg:flex-row gap-2">
              <span className="flex items-center gap-1 font-semibold ">
                Brand:
                <Image
                  src={`${data.brand.image}`}
                  alt="product's company"
                  width={90}
                  height={90}
                />
              </span>
              <div className="flex gap-2 ms-2">
                <span className="flex items-center gap-2 font-semibold">
                  Category:
                </span>
                <span className="bg-blue-200 p-1 px-2.5 rounded-xl text-blue-600 text-sm font-semibold">
                  {data.category.name}
                </span>
              </div>
            </div>
            {/********************* last-updated ********************/}
            <div className="updated-status flex gap-4">
              <div className="last-updated flex items-center gap-2">
                <Icon icon="uil:calender" className="text-zinc-500" />
                <span className="text-zinc-500">
                  Added:{" "}
                  {`${new Intl.DateTimeFormat("en-US", {
                    day: "2-digit",
                    year: "numeric",
                    month: "2-digit",
                  }).format(new Date(data.createdAt))}`}
                </span>
              </div>
              <div className="last-updated flex items-center gap-2">
                <Icon icon="uil:calender" className="text-zinc-500" />
                <span className="text-zinc-500">
                  Updated:{" "}
                  {`${new Intl.DateTimeFormat("en-US", {
                    day: "2-digit",
                    year: "numeric",
                    month: "2-digit",
                  }).format(new Date(data.updatedAt))}`}
                </span>
              </div>
            </div>
          </div>
          <Button
            className="group cursor-pointer rounded-lg text-lg hover:scale-[1.01] *:transition-all *:duration-300 transition duration-300 bg-zinc-300 hover:bg-linear-90  hover:from-white hover:from-[-30%] hover:via-black hover:via-50% hover:to-white hover:to-130% flex py-6"
            variant={"outline"}
            onClick={() => handleAddToCart(product.id)}
          >
            <span className="group-hover:text-white font-bold flex items-center gap-4">
              <Icon
                icon="carbon:shopping-cart"
                className="text-3xl text-black group-hover:text-white transition-all duration-300"
              />
              Add to Cart
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}
