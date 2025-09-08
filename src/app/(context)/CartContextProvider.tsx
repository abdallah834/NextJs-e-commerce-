"use client";

import { getCartData } from "@/lib/services/cart";
import { useSession } from "next-auth/react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
// to use a function call in a context we declare an interface for the context
interface CartContextTypes {
  getUserCart: () => Promise<void>;
  cartData: any;
  cartProductsAmount: number;
}
// assign the declared interface to the context before setting initial value
export const cartContext = createContext<CartContextTypes | undefined>(
  undefined
);
export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  ////////////////////////// Cart Context  ///////////////////////////////////

  const [cartData, setCartData] = useState(null);
  const [cartProductsAmount, setCartProductsAmount] = useState(0);
  // getting user info to conditionally execute the code in useEffect
  const { data: session } = useSession();
  async function getUserCart() {
    try {
      // to not have the function cause a loop in the context we have to define it within another function and also use it in another component
      // getting the cart data then setting it in a state
      const userCart = await getCartData();
      setCartData(userCart);
      setCartProductsAmount(userCart?.numOfCartItems);
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  }
  useEffect(() => {
    if (session?.user) {
      getUserCart();
    }
  }, [session?.user]);

  const data = {
    getUserCart,
    cartData,
    cartProductsAmount,
  };
  return <cartContext.Provider value={data}>{children}</cartContext.Provider>;
}

// basically a shorthand to use the cartContext
export const useCart = () => {
  const context = useContext(cartContext);
  if (context === undefined) {
    throw new Error("Make sure to login first");
  }
  return context;
};
