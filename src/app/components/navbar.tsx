"use client"
import { useState, useRef } from 'react';
import Image from 'next/image';
import {createPortal} from "react-dom"
import ShoppingCart from '@/app/components/cart'
import {useShoppingCart} from "use-shopping-cart"
import { UserButton } from "@clerk/nextjs";

export function Navbar() {
  const [showModal2, setShowModal2] = useState(false);
  const userRef = useRef(null);
  const {handleCartClick} = useShoppingCart()

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">Unique Boutique</div>
      <div>
	  <UserButton afterSignOutUrl="/"/>
        <button 
	    onClick={() => handleCartClick()}
            className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 items-center">
          <Image src="/cart.svg" width={20} height={20} alt='cart' />
        </button>
            <ShoppingCart/>
      </div>
    </nav>
  );
};


