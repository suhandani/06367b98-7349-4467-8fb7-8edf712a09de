"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { z } from "zod";
import { FormSchema } from "@/lib/schema";
import { deleteEntry } from "@/app/_action";
import { useRouter } from "next/navigation";
import ModalSuccess from "../ModalSuccess";

type Inputs = z.infer<typeof FormSchema>;
interface Props {
  category: [];
  product: Inputs;
  id: string;
}

export default function FormDelete({ category, product, id }: Props) {
  const [data, setData] = useState<Inputs>();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result = await deleteEntry(id);

    if (!result) {
      console.log("Something went wrong");
      return;
    }

    reset();
    setData(result.data);
  };
  return (
    <>
      <form onSubmit={handleSubmit(processForm)}>
        <div className="mb-4">
          <div className="mb-4">
            <label className="block text-sm capitalize font-medium text-gray-600">
              Title
            </label>
            <input
              {...register("title")}
              value={product.title}
              disabled
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm capitalize font-medium text-gray-600">
              Price
            </label>
            <input
              {...register("price")}
              defaultValue={product.price}
              disabled
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm capitalize font-medium text-gray-600">
              Rating
            </label>
            <input
              {...register("rating")}
              defaultValue={product.rating}
              disabled
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm capitalize font-medium text-gray-600">
              Stock
            </label>
            <input
              {...register("stock")}
              defaultValue={product.stock}
              disabled
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm capitalize font-medium text-gray-600">
              Brand
            </label>
            <input
              {...register("brand")}
              defaultValue={product.brand}
              disabled
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <label className="block text-sm font-medium text-gray-600">
            Category
          </label>
          <select
            {...register("category")}
            defaultValue={product.category}
            disabled
            className="mt-1 p-2 w-full border rounded-md"
          >
            {category.map((category: string, index: number) => {
              return (
                <option key={index} value={category} className="capitalize">
                  {category}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            {...register("description")}
            defaultValue={product.description}
            disabled
            className="mt-1 p-2 w-full border rounded-md"
          ></textarea>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 m-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Delete This Product
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-blue-500 text-white px-4 py-2 m-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Back
          </button>
        </div>
      </form>
      {data ? <ModalSuccess data={data} type="Delete" /> : ""}
    </>
  );
}
