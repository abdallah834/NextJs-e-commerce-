// "use server";
// use server only works with mutation functions(put,delete,post) and works with (get) inside of a server component.
// if (get) is used with "use server" it will not work on a "use client" component method appears as (post)for some reason.
import { redirect } from "next/navigation";
import { getSessionToken } from "../server-utils";

// getting all cart data
export async function getCartData() {
  // before using the token in any API calls always make sure to decode the session token then use it in API call.
  const userToken = await getSessionToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart`,
    {
      headers: { token: userToken, "Content-Type": "application/json" },
      // we use no-store since we want our data to be constantly updated
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error: Status${response.status}`);
  }
  const cartData = await response.json();
  return cartData;
}

// Removing a specific item from the cart

export async function removeCartItem(id?: string) {
  // before using the token in any API calls always make sure to decode the session token then use it in API call.
  const userToken = await getSessionToken();
  const response = await fetch(
    // we check if there is an ID to use same function to remove specific or all items
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart/${id ? id : ""}`,
    {
      method: "DELETE",
      headers: { token: userToken, "Content-Type": "application/json" },
      // we use no-store since we want our data to be constantly updated
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  const delData = await response.json();
  return delData;
}

// Adding a specific item to the cart

export async function addToCart(id: string) {
  // before using the token in any API calls always make sure to decode the session token then use it in API call.
  const userToken = await getSessionToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart`,
    {
      body: JSON.stringify({
        productId: id,
      }),
      method: "POST",
      headers: { token: userToken, "Content-Type": "application/json" },
      // we use no-store since we want our data to be constantly updated
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  const addData = await response.json();
  return addData;
}
// update product cart quantity
export const updateItemCount = async (
  productId: string,
  productCount: number
) => {
  const userToken = await getSessionToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart/${productId}`,
    {
      body: JSON.stringify({
        count: productCount,
      }),
      method: "PUT",
      headers: { token: userToken, "Content-Type": "application/json" },
      // we use no-store since we want our data to be constantly updated
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  const checkOutRes = await response.json();
  // redirect from next/navigation only works with server side
  return checkOutRes.numOfCartItems;
};

////////////////////// CheckOut /////////////////////////
export const checkOutCOD = async (shippingAddress: any, cartId: string) => {
  const userToken = await getSessionToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/${cartId}`,
    {
      body: JSON.stringify(shippingAddress),
      method: "POST",
      headers: { token: userToken, "Content-Type": "application/json" },
      // we use no-store since we want our data to be constantly updated
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  const checkOutRes = await response.json();
  return checkOutRes;
};
export const checkOutCredit = async (shippingAddress: any, cartId: string) => {
  const userToken = await getSessionToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXT_PUBLIC_CHECKOUT_URL}`,
    {
      body: JSON.stringify(shippingAddress),
      method: "POST",
      headers: { token: userToken, "Content-Type": "application/json" },
      // we use no-store since we want our data to be constantly updated
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  const checkOutRes = await response.json();
  // redirect from next/navigation only works with server side
  redirect(checkOutRes.session.url);
};
