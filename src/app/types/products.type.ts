/////////////////////////////////////////////////////////////////
export interface IProduct {
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
  imageCover: string;
  category: Brand;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  category?: string;
}
export interface IFeaturedImages {
  alt: string;
  src: string;
  brand: string;
}
export interface ICategories {
  createdAt: string;
  image: string;
  name: string;
  slug: string;
  updatedAt: string;
  _id: string;
}
/////////////////////////////////////////////////////////////////
