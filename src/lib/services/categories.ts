export async function getAllCategories() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/categories`
  );
  const allCategories = await response.json();
  if (!response.ok) {
    return { error: response.statusText };
  }
  return allCategories;
}
