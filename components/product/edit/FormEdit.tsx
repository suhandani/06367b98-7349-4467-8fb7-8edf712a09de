"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

import { ZodFormattedError, z } from "zod";
import { FormSchema } from "@/lib/schema";
import { editEntry } from "@/app/_action";
import ModalSuccess from "../ModalSuccess";

type Inputs = z.infer<typeof FormSchema>;
interface Props {
  category: string[];
  product: Inputs;
  id: string;
}

export default function FormEdit({ category, product, id }: Props) {
  const [data, setData] = useState<Inputs>();
  const [errors, setErrors] = useState<ZodFormattedError<Inputs, string>>();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result = await editEntry(data, id);

    if (!result) {
      console.log("Something went wrong");
      return;
    }

    if (result.error) {
      setErrors(result.error);
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
              defaultValue={product.title}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors?.title?._errors[0] && (
              <p className="text-sm text-red-400">{errors.title._errors[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm capitalize font-medium text-gray-600">
              Price
            </label>
            <input
              {...register("price")}
              defaultValue={product.price}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors?.price?._errors[0] && (
              <p className="text-sm text-red-400">{errors.price._errors[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm capitalize font-medium text-gray-600">
              Rating
            </label>
            <input
              {...register("rating")}
              defaultValue={product.rating}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors?.rating?._errors[0] && (
              <p className="text-sm text-red-400">{errors.rating._errors[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm capitalize font-medium text-gray-600">
              Stock
            </label>
            <input
              {...register("stock")}
              defaultValue={product.stock}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors?.stock?._errors[0] && (
              <p className="text-sm text-red-400">{errors.stock._errors[0]}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm capitalize font-medium text-gray-600">
              Brand
            </label>
            <input
              {...register("brand")}
              defaultValue={product.brand}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors?.brand?._errors[0] && (
              <p className="text-sm text-red-400">{errors.brand._errors[0]}</p>
            )}
          </div>
          <label className="block text-sm font-medium text-gray-600">
            Category
          </label>
          <select
            {...register("category")}
            defaultValue={product.category}
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
          {errors?.category?._errors[0] && (
            <p className="text-sm text-red-400">{errors.category._errors[0]}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            {...register("description")}
            defaultValue={product.description}
            className="mt-1 p-2 w-full border rounded-md"
          ></textarea>
          {errors?.description?._errors[0] && (
            <p className="text-sm text-red-400">
              {errors.description._errors[0]}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Edit Product
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-orange-500 text-white px-4 py-2 m-2 rounded-md hover:bg-orange-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Back
          </button>
        </div>
      </form>
      {data ? <ModalSuccess data={data} type="Edit" /> : ""}
    </>
  );
}
