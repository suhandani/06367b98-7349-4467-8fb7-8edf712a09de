import { ProductModal } from "@/types/global";
import Image from "next/image";
import Link from "next/link";

export default function ModalSuccessAdd({ data, type }: ProductModal) {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Success {type} Data
                  </h3>
                  <div className="mt-3">
                    <p>
                      <Image
                        src={data.thumbnail}
                        alt={data.title}
                        width={200}
                        height={200}
                      />
                    </p>
                    <p className="text-sm text-gray-500">
                      Title : {data.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      Price : ${data.price}
                    </p>
                    <p className="text-sm text-gray-500">
                      Rating : {data.rating}
                    </p>
                    <p className="text-sm text-gray-500">
                      Stock : {data.stock}
                    </p>
                    <p className="text-sm text-gray-500">
                      Brand : {data.brand}
                    </p>
                    <p className="text-sm text-gray-500">
                      Category : {data.category}
                    </p>
                    <p className="text-sm text-gray-500">
                      Description : {data.description}
                    </p>
                    {data.images.map((image, index: number) => {
                      return (
                        <p className="text-sm text-gray-500" key={index}>
                          Images {index + 1} : {image}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Link
                href="/"
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
