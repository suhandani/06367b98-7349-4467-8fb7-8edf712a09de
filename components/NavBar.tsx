import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl mb-6">
        <Link
          href="/"
          className="inline-block text-l px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-teal-200 hover:bg-teal-700 mt-4 lg:mt-0"
        >
          Homepage
        </Link>
      </div>
    </nav>
  );
}
