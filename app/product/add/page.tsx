import { fetchCategory } from "@/app/_action";
import FormAdd from "@/components/product/add/FormAdd";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Product",
};

export default async function Add() {
  const category = await fetchCategory();

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Add Product</h2>
      <FormAdd category={category} />
    </div>
  );
}
