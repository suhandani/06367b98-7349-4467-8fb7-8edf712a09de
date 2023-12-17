import Link from "next/link";

import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import { ProductListType } from "@/types/global";
import { Metadata } from "next";

export const generateMetadata = ({
  searchParams,
}: {
  searchParams: { page?: number };
}): Metadata => {
  return {
    title:
      `Ambisius Test` +
      `${searchParams.page ? " - Page " + searchParams.page : ""}`,
  };
};

const fetchProducts = async (searchParams: { page?: number }) => {
  const link = !searchParams.page
    ? "https://dummyjson.com/products?limit=10"
    : "https://dummyjson.com/products?limit=10&skip=" +
      (searchParams.page - 1) * 10;

  const products = await fetch(link);

  if (!products.ok) {
    throw new Error("Failed to fetch data");
  }
  return products.json();
};

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: number };
}) {
  //Fetch product
  const products = await fetchProducts(searchParams);

  //Get Total Page with limit 10 Products
  const totalPage = [];
  for (let i = 1; i <= products.total / 10; i++) {
    totalPage.push(i);
  }

  return (
    <>
      <SearchBar />
      <table className="min-w-full bg-white border border-gray-300 shadow-lg mt-4">
        <thead>
          <tr className="border-b ">
            <th className="py-2 px-4 bg-gray-800 text-white">Thumbnail</th>
            <th className="py-2 px-4 bg-gray-800 text-white">Title</th>
            <th className="py-2 px-4 bg-gray-800 text-white">Price</th>
            <th className="py-2 px-4 bg-gray-800 text-white">Discount</th>
            <th className="py-2 px-4 bg-gray-800 text-white">Rating</th>
            <th className="py-2 px-4 bg-gray-800 text-white">Stock</th>
            <th className="py-2 px-4 bg-gray-800 text-white">Brand</th>
            <th className="py-2 px-4 bg-gray-800 text-white">Category</th>
            <th className="py-2 px-4 bg-gray-800 text-white">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.products.map((product: ProductListType) => (
            <ProductList product={product} key={product.id} />
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          {/* Pagination */}
          {totalPage.map((num) => {
            return (
              <Link
                key={num}
                href={{
                  pathname: "/",
                  query: {
                    page: num,
                  },
                }}
                className={`p-2 ${
                  num == searchParams.page ||
                  (searchParams.page == undefined && num == 1)
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                } rounded-md focus:outline-none focus:shadow-outline-blue`}
                type="button"
              >
                {num}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
