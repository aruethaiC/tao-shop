"use client";
import Image from "next/image";
import React, { useState } from "react";
import useCartStore from "../cartStore";

function Details({ product }) {
  //const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);
  

  const handleAddToCart = () => {
    addToCart({ product, quantity: quantity });
  };

  return (
    <div className="max-w-7xl mx-auto mt-20">
      <h1 className="text-3xl text-center font-semibold text-[#990033] mb-6">
        Product Details
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* left */}
        <div className="shadow-md relative h-96 overflow-hidden aspect-ratio-1">
          <Image
            src={product?.image}
            layout="fill"
            objectFit="cover"
            alt="image of product"
          />
        </div>
        {/* right */}
        <div className="flex flex-col p-6 justify-between">
          <h1 className="text-3xl font-semibold text-[#990033]">
            {product?.name}
          </h1>
          <p className="text-lg mt-4 text-gray-500">{product?.description}</p>

          <div className="mt-5">
            <span className="text-2xl font-semibold text-[#990033]">
              {product?.price}฿
            </span>
          </div>

          <div className="mt-6 flex flex-col text-fray-500">
            <label htmlFor="">Quantity</label>
            <input
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              type="number"
             
              className="w-20 px-4 h-10 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-[#990033] text-white py-3 px-6 rounded-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
