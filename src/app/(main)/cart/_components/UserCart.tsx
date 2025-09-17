"use client";
// using context provided by providers.tsx
import { useCart } from "@/app/(context)/CartContextProvider";
import { ICart } from "@/app/types/cart.types";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CartSkeleton } from "./CartSkeleton";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { removeCartItem, updateItemCount } from "@/lib/services/cart";
import { toast } from "sonner";
import CartSummary from "./OrderSummary";

export default function UserCart() {
  const { cartData, getUserCart } = useCart();
  const cartProducts = cartData?.data.products;

  async function handleItemRemoval(itemId: string) {
    // starting by removing the item function
    await toast.promise(removeCartItem(itemId), {
      loading: "Removing product",
      success: "Product removed",
      error: "Failed to remove product",
    });
    // Revalidating || Recalling all items
    await getUserCart();
  }
  async function handleAllItemsRemoval() {
    await toast.promise(removeCartItem(), {
      loading: "Deleting products...",
      success: "Products removed",
      error: "Failed to remove products",
    });
    await getUserCart();
  }

  async function handleIncrementCount(itemId: string, productCount: number) {
    if (productCount > 0) {
      await toast.promise(updateItemCount(itemId, productCount + 1), {
        loading: "Increasing count",
        success: "Count increased successfully",
        error: "Failed to increase count",
      });
      await getUserCart();
    }
  }
  async function handleDecrementCount(itemId: string, productCount: number) {
    if (productCount > 0) {
      await toast.promise(updateItemCount(itemId, productCount - 1), {
        loading: "Decreasing count",
        success: "Count decreased successfully",
        error: "Failed to decrease count",
      });
      await getUserCart();
    }
  }
  let count = 1;

  return (
    <div className="container mx-auto">
      <div className="flex justify-between mt-10">
        <h3 className="uppercase font-extralight text-2xl rounded-3xl text-center w-fit tracking-widest">
          <span className="bg-black px-4 rounded-lg text-white py-2">
            Your Cart
          </span>
        </h3>
        <Button onClick={handleAllItemsRemoval}>Delete Cart</Button>
      </div>
      <div className="flex justify-between flex-col lg:flex-row mt-15 min-h-screen gap-7">
        {/*************** cart-products **************/}
        <div className="cart-container">
          {!cartData ? (
            Array.from({ length: 3 }).map((_, index) => (
              <CartSkeleton key={index} />
            ))
          ) : cartProducts.length === 0 ? (
            <h3 className="text-xl font-bold">Your cart is empty</h3>
          ) : (
            <div className="flex justify-center lg:justify-start">
              <ul className="products w-lg sm:w-xl md:w-2xl flex flex-col gap-2 *:bg-zinc-200 lg:w-xl justify-center lg:justify-start">
                {cartProducts.map((item: ICart) => (
                  <li
                    key={item._id}
                    className="p-7 flex justify-between rounded-lg"
                  >
                    <div className="product flex gap-3">
                      {/*************** product-image **************/}
                      <Image
                        src={`${item?.product.imageCover}`}
                        alt="product image"
                        width={140}
                        height={140}
                        loading="lazy"
                        className="rounded-xl"
                      />
                      {/*************** product-details **************/}
                      <div className="flex flex-col gap-2">
                        <span className="block font-semibold text-xl">
                          {item?.product.title}
                        </span>
                        <span className="block font-semibold text-black/60">
                          color:
                        </span>
                        <span className="block font-semibold text-black/60">
                          size:
                        </span>
                        <span className="block font-bold">{`${item.price} EGP`}</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between">
                      <div className="flex justify-end">
                        <Button
                          className="bg-white text-black hover:bg-black hover:text-white"
                          onClick={() => handleItemRemoval(item.product._id)}
                        >
                          <Icon icon="bxs:trash" className="text-xl" />
                        </Button>
                      </div>
                      <div className="flex justify-evenly items-center gap-2">
                        <button
                          className="bg-white text-black px-2.5 text-lg flex items-center rounded-md font-bold cursor-pointer hover:bg-black hover:text-white transition-all duration-300"
                          onClick={() =>
                            handleDecrementCount(item.product.id, item.count)
                          }
                        >
                          -
                        </button>
                        <span className="bg-white px-2 rounded-lg font-bold">
                          {item.count}
                        </span>
                        <button
                          className="bg-white text-black px-2.5 text-lg flex items-center rounded-md font-bold cursor-pointer hover:bg-black hover:text-white transition-all duration-300"
                          onClick={() =>
                            handleIncrementCount(item.product.id, item.count)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/*************** products-pricing **************/}
        {cartData && cartProducts.length > 0 ? (
          <div className="pricing flex justify-center">
            <CartSummary />
          </div>
        ) : null}
      </div>
    </div>
  );
}
