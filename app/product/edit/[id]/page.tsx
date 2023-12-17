import { fetchCategory, fetchSingleProduct } from "@/app/_action";
import FormEdit from "@/components/product/edit/FormEdit";
import { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { id?: string };
}): Metadata => {
  return {
    title: `Update - Product - ${params.id}`,
  };
};

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
