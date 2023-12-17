import FormEdit from "@/components/product/edit/FormEdit";

export async function fetchCategory() {
  const category = await fetch("https://dummyjson.com/products/categories");

  if (!category.ok) {
    throw new Error("Failed to fetch data");
  }
  return category.json();
}

export async function fetchSingleProduct(id: string) {
  const product = await fetch("https://dummyjson.com/products/" + id);

  if (!product.ok) {
    throw new Error("Failed to fetch data");
  }
  return product.json();
}

export default async function Edit({ params }: { params: { id: string } }) {
  const category = await fetchCategory();
  const product = await fetchSingleProduct(params.id);

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Edit Product</h2>
      <FormEdit category={category} product={product} id={params.id} />
    </div>
  );
}