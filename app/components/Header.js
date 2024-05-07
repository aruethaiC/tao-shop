"use client";
import Image from "next/image";
import { FaCartShopping } from "react-icons/fa6";
import { MdLocalShipping } from "react-icons/md";
import { UserButton } from "@clerk/nextjs";
import useCartStore from "../cartStore";
import Link from "next/link";
import { FaTruck } from "react-icons/fa";


const Header = () => {
  const totalItems = useCartStore((state) => state.totalItems);
  return (
    <div className="p-3 border-b-2 border-[#F5F3FF]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <Link href='/'>
        <div className="flex items-center cursor-pointer" >
          <Image src="/logo.png" width={60} height={60} alt="logo" />
          <h1 className="ml2 text-2xl lg-text-3xl font-bold text-[#990033]">
            Tao Shop
          </h1>
        </div>
        </Link>
        <div className="flex items-center relative">
          <Link href="/cart">
            <FaCartShopping className="text-3xl text-[#990033] cursor-pointer" />
          </Link>
          {totalItems > 0 && (
            <div className="ml-2 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs font-semibold">
              {totalItems}
            </div>
          )}
        <Link href="/order">
            <FaTruck  className="ml-4 text-3xl text-[#990033] cursor-pointer" />
          </Link>


          <div className="ml-4">
            <UserButton afterSignOutUrl="/" className="ml-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
