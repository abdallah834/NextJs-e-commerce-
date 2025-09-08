export async function getAllBrands() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
  const data = await response.json();
  if (!response.ok) {
    return { error: response.statusText };
  }
  return data;
}
