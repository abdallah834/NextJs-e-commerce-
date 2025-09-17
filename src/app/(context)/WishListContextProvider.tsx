"use client";

import {
  addToWishList,
  getUserWishlist,
  removeWishListItem,
} from "@/lib/services/wishlist";
import { useSession } from "next-auth/react";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

interface IWishListTypes {
  wishListItems: any;
  wishedIds: string[];
  setWishListItems: Dispatch<SetStateAction<{} | null>>;
  setWishedIds: Dispatch<SetStateAction<string[]>>;
  handleAddToWishList: (productId: string) => Promise<void>;
  handleRemoveWishList: (productId: string) => Promise<void>;
}

export const wishListContext = createContext<IWishListTypes | undefined>(
  undefined
);
export default function WishListContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  /////////////////// wishList Context ///////////////////
  const [wishListItems, setWishListItems] = useState<{} | null>(null);
  const [wishedIds, setWishedIds] = useState<string[]>([]);
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user) {
      async function setAllWishListData() {
        try {
          const getWishListedItems = await getUserWishlist();
          setWishListItems(getWishListedItems);
          setWishedIds(
            (prev) => (prev += getWishListedItems?.map((item: any) => item.id))
          );
        } catch (error) {
          toast.error(`Error: ${error}`);
        }
      }
      setAllWishListData();
    }
  }, [session?.user]);
  async function handleAddToWishList(productId: string) {
    try {
      await toast.promise(addToWishList(productId), {
        loading: "Adding to wishlist",
        success: "Added to wishlist",
        error: "Failed to wishlist",
      });
      const addedIds = await addToWishList(productId);
      setWishedIds(addedIds);
      const getWishListedItems = await getUserWishlist();
      setWishListItems(getWishListedItems);
    } catch (error) {
      toast.error(`${error}`);
    }
  }
  async function handleRemoveWishList(productId: string) {
    try {
      await toast.promise(removeWishListItem(productId), {
        loading: "Removing from wishlist",
        success: "Item removed from wishlist",
        error: "Failed to remove from wishlist",
      });
      const removedIds = await removeWishListItem(productId);
      setWishedIds(removedIds);
      const getWishListedItems = await getUserWishlist();
      setWishListItems(getWishListedItems);
    } catch (error) {
      toast.error(`${error}`);
    }
  }

  const data = {
    wishListItems,
    setWishListItems,
    wishedIds,
    setWishedIds,
    handleAddToWishList,
    handleRemoveWishList,
  };
  return (
    <wishListContext.Provider value={data}>{children}</wishListContext.Provider>
  );
}
export const useWishList = () => {
  const context = useContext(wishListContext);
  if (context === undefined) {
    throw new Error("Make sure to login first");
  }
  return context;
};
