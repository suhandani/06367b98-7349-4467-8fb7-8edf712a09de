"use client";
import { useState } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

import { ZodFormattedError, z } from "zod";
import { FormSchema } from "@/lib/schema";
import { addEntry } from "@/app/_action";
import ModalSuccess from "../ModalSuccess";
import { ProductListType } from "@/types/global";

type Inputs = z.infer<typeof FormSchema>;

interface Props {
  category: string[];
}

export default function FormAdd({ category }: Props) {
  const [data, setData] = useState<ProductListType>();
  const [errors, setErrors] = useState<ZodFormattedError<Inputs, string>>();
  const resImages = [{ url: "" }];

  const { register, handleSubmit, reset, control } = useForm<Inputs>({
    defaultValues: { images: resImages },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "images" });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    const result = await addEntry(data);

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
              Thumbnail Image URL
            </label>
            <input
              {...register("thumbnail")}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors?.thumbnail?._errors[0] && (
              <p className="text-sm text-red-400">
                {errors.thumbnail._errors[0]}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm capitalize font-medium text-gray-600">
              Title
            </label>
            <input
              {...register("title")}
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
            className="mt-1 p-2 w-full border rounded-md"
          ></textarea>
          {errors?.description?._errors[0] && (
            <p className="text-sm text-red-400">
              {errors.description._errors[0]}
            </p>
          )}
        </div>

        {fields.map((field, index: number) => {
          return (
            <div className="mb-4" key={field.id}>
              <label className="block text-sm capitalize font-medium text-gray-600">
                Image {index + 1}
              </label>
              <div className="flex">
                <input
                  {...register(`images.${index}.url`)}
                  className="mt-1 p-2 w-full border rounded-md flex"
                />
                {fields.length != 1 ? (
                  <div
                    className="flex bg-red-500 text-white px-4 py-2 m-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                    onClick={() => remove(index)}
                  >
                    x
                  </div>
                ) : (
                  ""
                )}
              </div>
              {errors?.images?.[index]?.url?._errors[0] && (
                <p className="text-sm text-red-400">
                  {errors?.images?.[index]?.url?._errors[0]}
                </p>
              )}
            </div>
          );
        })}
        <div
          onClick={() => append({ url: "New Url" })}
          className="inline-flex items-center justify-center w-10 h-10 mr-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"></path>
          </svg>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Add Product
          </button>
        </div>
      </form>
      {data ? <ModalSuccess data={data} type="Add" /> : ""}
    </>
  );
}
