import { IProduct } from "@/app/types/products.type";
import { getSessionToken } from "../server-utils";

export async function addToWishList(productId: string) {
  const userToken = await getSessionToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wishlist`,
    {
      method: "POST",
      body: JSON.stringify({
        productId,
      }),
      headers: {
        token: userToken,
        "Content-Type": "application/json",
      },
    }
  );
  const wishlistRes = await response.json();
  return wishlistRes.data;
}
export async function removeWishListItem(productId: string) {
  const userToken = await getSessionToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: userToken,
        "Content-Type": "application/json",
      },
    }
  );
  const delWishlistRes = await response.json();
  return delWishlistRes.data;
}
export async function getUserWishlist() {
  const userToken = await getSessionToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wishlist`,
    {
      method: "GET",
      headers: {
        token: userToken,
        "Content-Type": "application/json",
      },
    }
  );
  const getWishlistRes = await response.json();
  const wishListedItems = await getWishlistRes.data;

  return wishListedItems;
}
