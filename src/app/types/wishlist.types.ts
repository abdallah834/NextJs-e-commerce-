export interface IWishList {
  status: string;
  count: number;
  data: [];
}

export interface Datum {
  sold: number;
  images: string[];
  subcategory: Brand[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount: number;
  imageCover: string;
  category: Brand;
  brand: Brand;
  ratingsAverage: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  category?: string;
}
