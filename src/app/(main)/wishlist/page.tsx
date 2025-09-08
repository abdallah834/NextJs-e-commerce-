"use client";
import { useWishList } from "@/app/(context)/WishListContextProvider";
import ProductCardsContainer from "../products/_components/ProductCardsContainer";
import { useSession } from "next-auth/react";

export default function Wishlist() {
  const { wishListItems } = useWishList();
  const { status } = useSession();

  return (
    <>
      <div className="container mx-auto flex items-center justify-center pt-6">
        {status === "unauthenticated" ? (
          <h3 className="text-xl font-bold mt-10 tracking-wide">
            Make sure to sign in first
          </h3>
        ) : wishListItems && wishListItems.length === 0 ? (
          <h3 className="text-xl font-bold mt-10 tracking-wide">
            You don't have any wishlisted products
          </h3>
        ) : (
          <div className="container mx-auto">
            <ProductCardsContainer products={wishListItems} />
          </div>
        )}
      </div>
    </>
  );
}
