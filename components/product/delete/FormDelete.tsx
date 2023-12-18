"use client";
import { useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { z } from "zod";
import { FormSchema } from "@/lib/schema";
import { deleteEntry } from "@/app/_action";
import ModalSuccess from "../ModalSuccess";
import { ProductListType } from "@/types/global";

type Inputs = z.infer<typeof FormSchema>;
interface Props {
  category: string[];
  product: ProductListType;
  id: string;
}

export default function FormDelete({ category, product, id }: Props) {
  const [data, setData] = useState<ProductListType>();
  const router = useRouter();
  const resImages = product.images.map((url) => {
    return {
      url,
    };
  });

  const { register, handleSubmit, reset, control } = useForm<Inputs>({
    defaultValues: { images: resImages },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "images" });

  const processForm: SubmitHandler<Inputs> = async () => {
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
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={200}
              height={200}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm capitalize font-medium text-gray-600">
              Thumbnail Image URL
            </label>
            <input
              {...register("thumbnail")}
              className="mt-1 p-2 w-full border rounded-md"
              defaultValue={product.thumbnail}
              disabled
            />
          </div>
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

        {fields.map((field, index: number) => {
          return (
            <div className="mb-4" key={field.id}>
              <label className="block text-sm capitalize font-medium text-gray-600">
                Image {index + 1}
              </label>
              <input
                {...register(`images.${index}.url`)}
                className="mt-1 p-2 w-full border rounded-md"
                disabled
              />
            </div>
          );
        })}

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
