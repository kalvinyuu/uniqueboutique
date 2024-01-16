"use client"
import {useUser, } from "@auth0/nextjs-auth0/client"
import { useState, useRef } from 'react';
import Image from 'next/image';
import {createPortal} from "react-dom"
import ShoppingCart from '@/app/components/cart'
import {useShoppingCart} from "use-shopping-cart"

export function Navbar() {
  const [showModal2, setShowModal2] = useState(false);
  const userRef = useRef(null);
  const {handleCartClick} = useShoppingCart()

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="text-lg font-bold">Unique Boutique</div>
      <div>
        <button
          ref={userRef}
          className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 items-center"
          onClick={() => setShowModal2(!showModal2)}
        >
          <Image src="/user.svg" width={20} height={20} alt='user' />
          {showModal2 && userRef.current && createPortal(
            <ProfileClient />, userRef.current
          )}
        </button>
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


function ProfileClient() {
    const { user, error, isLoading, } = useUser();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
  
    return (
	user ?
	    <div className="absolute flex flex-col flex-wrap right-0 mt-8 mr-4 p-4 rounded-lg border shadow-lg">
		<div>
		    <h2>{user.name}</h2>
		    <p>{user.email}</p>
		    <p>{user.sub}</p>
		</div>
		<a href="/api/auth/logout">Logout</a>
	    </div>
	: <a href="/api/auth/login">Login</a>
    );
}
