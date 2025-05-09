/* eslint-disable prefer-const */

import Image from "next/image";
import Quantity from "./Quantity";
import Link from "next/link";

const fetchCart = async (id: string) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await res.json();
  return data;
};

async function Page() {
  const response = await fetch("https://fakestoreapi.com/carts/2");
  const cart = await response.json();
  const products = [];

  for (let item of cart.products) {
    const product = await fetchCart(item.productId);
    products.push({ ...product, quantity: item.quantity });
  }

  const totalQuantity = products.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-3/4  px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">იყიდე</h1>
              <h2 className="font-semibold text-2xl">3 რაოდენობა</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                დეტალები
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                რაოდენობა
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                ფასი
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                ჯამი
              </h3>
            </div>
            {products.map((item) => (
              <div key={item.id} className="flex items-center -mx-8 px-6 py-5">
                <div className="flex w-2/5">
                  <div className="w-20">
                    <Image
                      width={96}
                      height={96}
                      className="h-24"
                      src={item.image}
                      alt={item.title}
                    />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <Link href={`/products/${item.id}`}>
                      <span className="font-bold text-sm">{item.title}</span>
                    </Link>
                    <span className="text-red-500 text-xs">
                      {item.category}
                    </span>
                    <a
                      href="#"
                      className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                    >
                      Remove
                    </a>
                  </div>
                </div>

                <Quantity />

                <span className="text-center w-1/5 font-semibold text-sm">
                  ${item.price.toFixed(2)}
                </span>
                <span className="text-center w-1/5 font-semibold text-sm">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div id="summary" className="w-1/4 px-8 py-10">
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                სულ {totalQuantity}
              </span>
              <span className="font-semibold text-sm">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <div className="py-10">
              <label
                htmlFor="promo"
                className="font-semibold border-b-black inline-block mb-3 text-sm uppercase"
              >
                პრომო კოდი
              </label>
              <input
                readOnly
                type="text"
                id="promo"
                placeholder="Enter your code"
                className="p-2 text-sm w-full"
              />
            </div>
            <button className="bg-red-500 cursor-pointer hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
              გამოიყენე
            </button>

            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>მთლიანი ფასი</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button className="bg-indigo-500 cursor-pointer font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                შეძენა
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
