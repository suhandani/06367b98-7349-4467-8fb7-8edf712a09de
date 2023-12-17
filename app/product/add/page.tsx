import FormAdd from "@/components/product/add/FormAdd";

export async function fetchCategory() {
  const category = await fetch("https://dummyjson.com/products/categories");

  if (!category.ok) {
    throw new Error("Failed to fetch data");
  }
  return category.json();
}

export default async function Add() {
  const category = await fetchCategory();

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Add Product</h2>
      <FormAdd category={category} />
    </div>
  );
}
