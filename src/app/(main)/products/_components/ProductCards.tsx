"use client";
import { useCart } from "@/app/(context)/CartContextProvider";
import { useWishList } from "@/app/(context)/WishListContextProvider";
import { IProduct } from "@/app/types/products.type";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { addToCart } from "@/lib/services/cart";
import {
  addToWishList,
  getUserWishlist,
  removeWishListItem,
} from "@/lib/services/wishlist";
import { Icon } from "@iconify-icon/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductCards({ product }: { product: IProduct }) {
  // getting Cart context info as well as wishlist context.
  const { getUserCart } = useCart();
  const { status: userStatus } = useSession();
  const router = useRouter();

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
  const [wishedFor, setIsWishedFor] = useState(false);

  const { wishedIds, handleAddToWishList, handleRemoveWishList } =
    useWishList();

  // executing multiple functions based on a single condition or more using a single function
  async function handleAddToWished() {
    if (userStatus === "authenticated") {
      setIsWishedFor(true);
      await handleAddToWishList(product.id);
    } else {
      router.push("/auth/login");
    }
  }
  async function handleRemoveFromWished() {
    if (userStatus === "authenticated") {
      setIsWishedFor(false);
      await handleRemoveWishList(product.id);
    }
  }

  return (
    <>
      <Card className="bg-zinc-800/15 py-3 relative max-h-[440px]">
        {/********* Wishlist *********/}
        <Button
          className={`absolute text-3xl top-1 right-3 opacity-100 bg-black  rounded-xl p-1 flex justify-center items-center cursor-pointer ${
            wishedFor === true || wishedIds?.includes(product.id)
              ? `text-red-500`
              : `text-white`
          }`}
          onClick={() => {
            wishedFor === true || wishedIds?.includes(product.id)
              ? handleRemoveFromWished()
              : handleAddToWished();
          }}
        >
          <Icon icon="tabler:heart-filled" />
        </Button>

        <Link href={`/products/${product?.id}`}>
          <CardHeader className="p-0">
            {/********* product image *********/}
            <div className="flex items-center justify-center">
              <Image
                src={`${product?.imageCover}`}
                alt="picture"
                width={"180"}
                height={"300"}
                className="rounded-md "
                loading="lazy"
              />
            </div>
          </CardHeader>
          <CardContent>
            {/********* product title *********/}
            <h4 className="text-lg font-semibold truncate my-2">{`${product?.title}`}</h4>
            {/********* product brand *********/}
            <span className=" block text-emerald-700/60 font-bold mb-1">
              {`${product?.brand?.name}`}
            </span>
            {/********* product price & rating *********/}
            <div className="pricing-rating flex justify-between items-center">
              <span className="font-semibold tracking-wider">{`${product?.price} EGP`}</span>
              <div className="flex justify-center items-center gap-1.5">
                <span>{`${product?.ratingsAverage}`}</span>
                <Icon
                  icon="ic:round-star"
                  className="text-amber-400 text-3xl"
                />
              </div>
            </div>
          </CardContent>
        </Link>
        <CardFooter>
          {/********* add to cart *********/}
          <Button
            className="bg-black text-white w-full rounded-full font-semibold py-2 cursor-pointer *:transition-all *:duration-300 transition duration-300  hover:bg-linear-90  hover:from-white hover:from-[-20%] hover:via-black hover:via-50% hover:to-white hover:to-130% flex"
            onClick={() => handleAddToCart(product.id)}
          >
            <span className="group-hover:text-white">Add to Cart</span>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
