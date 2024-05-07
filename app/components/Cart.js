"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { BiSolidTrash } from "react-icons/bi";
import useCartStore from "../cartStore";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { createOrder } from "../../sanity/sanity-utils";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";



function Cart() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const totalItems = useCartStore((state) => state.totalItems);
  const cartTotal = useCartStore((state) => state.cartTotal);
  const { user } = useUser();
  const router = useRouter();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };
  const stripe = useStripe();
  const elements = useElements();

  const onsubmit = async () => {
    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) return null;
      const data = await axios.post("/api/stripe", {
        data: { amount: cartTotal.toFixed(0) },
      });

      console.log(data);
      const res = await stripe?.confirmCardPayment(data?.data?.intent, {
        payment_method: { card: cardElement },
      });
      //console.log(res.paymentIntent.status);
      const status = res?.paymentIntent?.status;
      if (status === "succeeded") {
        alert('Payment Successful')
        const email = user?.emailAddresses[0]?.emailAddress;

        if (email) {
          const res = await createOrder(email, cart);
          if (res) {
            router.push("/order");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-20">
      <h1 className="text-3xl text-center font-semibold text-[#990033] mb-6">
        Cart
      </h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-[#990033] border-b border-gray-200">
            <th className="px-4 py-3"> Product </th>
            <th className="px-4 py-3"> Price </th>
            <th className="px-4 py-3"> Quantity </th>
            <th className="px-4 py-3"> Remove </th>
          </tr>
        </thead>

        <tbody>
          {cart?.map((product) => (
            <tr
              className="hover:bg-gray-50 text-center border-b border-gray-300 text-[#990033] "
              key={product?.id}
            >
              <td className="py-2 px-4 flex items-center">
                <Image
                  className="mr-2"
                  src={product?.image}
                  width={50}
                  height={30}
                  style={{ width: "50px", height: "30px" }}
                  alt="art"
                />

                {product?.name}
              </td>
              <td className="py-2 px-4">{product?.price}</td>
              <td className="py-2 px-4">{product?.quantity}</td>
              <td className="py-2 px-4">
                <BiSolidTrash
                  onClick={() => {
                    handleRemoveFromCart(product?._id);
                  }}
                  className="text-[#990033] mx-auto hover:bg-gray-50 cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <div className="space-x-4 mt-10">
          <span className="text-lg font-semibold text-[#990033]">Total</span>
          <span className="text-lg font-semibold text-[#990033]">
            {cartTotal}฿
          </span>
        </div>

        <div className="mt-6 mb-6">
          <label className="text-lg mb-2 font-semibold text-[#990033]">
            Card Details
          </label>
          <CardElement className="border border-gray-200 rounded-md p-4" />
        </div>

        <div className="mt-6 max-w-sm mx-auto space-y-4">
          <button disabled={cartTotal === 0}
            onClick={onsubmit}
            className="text-lg w-full font-semibold text-center mr-4 bg-white hover:bg-[#990033] hover:text-white text-[#990033] border border-[#990033] py-2 px-4 rounded"
          >
            Checkout
          </button>
          <button className="text-lg w-full font-semibold text-center mr-4 bg-white hover:bg-[#990033] hover:text-white text-[#990033] border border-[#990033] py-2 px-4 rounded">
            <Link className="" href="/">
              Back to Shopping
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
