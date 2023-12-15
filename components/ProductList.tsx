import Link from "next/link";

import { ProductListType } from "@/types/global";

interface Props {
  product: ProductListType;
}

export default function ProductList({ product }: Props) {
  return (
    <tr className="border-b hover:bg-gray-100 transition text-center">
      <td className="py-2 px-4">
        <img className="object-fill h-24 w-60" src={product.thumbnail} />
      </td>
      <td className="py-2 px-4 h-24 w-60">{product.title}</td>
      <td className="py-2 px-4">${product.price}</td>
      <td className="py-2 px-4">{product.discountPercentage}%</td>
      <td className="py-2 px-4">{product.rating}</td>
      <td className="py-2 px-4">{product.stock}</td>
      <td className="py-2 px-4 h-24 w-60">{product.brand}</td>
      <td className="py-2 px-4 capitalize h-24 w-60">
        <Link
          href={{
            pathname: "/category/",
            query: {
              category: product.category,
            },
          }}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          {product.category}
        </Link>
      </td>
      <td className="py-2 px-4">
        <button className="text-blue-500 hover:underline mr-2" type="button">
          Edit
        </button>
        <button className="text-red-500 hover:underline" type="button">
          Delete
        </button>
      </td>
    </tr>
  );
}
