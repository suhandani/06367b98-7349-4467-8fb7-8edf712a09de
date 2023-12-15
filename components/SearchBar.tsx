import Link from "next/link";
import { redirect } from "next/navigation";

async function searchURL(data: FormData) {
  "use server";
  redirect("/search/?q=" + data.get("query"));
}

export default function SearchBar() {
  return (
    <form action={searchURL} className="flex items-center space-x-4">
      <div className="relative flex-1">
        <input
          name="query"
          type="search"
          className="form-input w-full h-10 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
          placeholder="Search All Product..."
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
        type="submit"
      >
        Search
      </button>

      <Link
        href="/add"
        className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
        type="button"
      >
        + New Product
      </Link>
    </form>
  );
}
