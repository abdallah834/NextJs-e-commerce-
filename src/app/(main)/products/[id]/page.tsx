import { IProduct } from "@/app/types/products.type";
import { getAllProducts, getProductDetails } from "@/lib/services/products";
import ProductDetails from "../_components/ProductDetails";
import RelatedProducts from "../_components/RelatedProducts";

export default async function page({ params }: { params: { id: string } }) {
  // redirecting the user to the stored ID in URL in product cards then getting the specific ID as a param and using it to call details function.
  const paramsResponse = await params;
  const id = await paramsResponse.id;
  const details = await getProductDetails(id);
  // filtering all products to display in the related products section
  const allProducts = await getAllProducts();
  const filteredProducts = allProducts.filter((product: IProduct) =>
    product.category.name.includes(details.category.name)
  );
  return (
    <>
      <ProductDetails product={details} />
      <RelatedProducts products={filteredProducts} id={id} />
    </>
  );
}
