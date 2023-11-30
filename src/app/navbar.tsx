"use client"
import {useUser,  } from "@auth0/nextjs-auth0/client"
import { useState } from 'react';
import Image from 'next/image';
import {createPortal} from "react-dom"
// Function to get items from local storage
const getCartItems = () => {
  const cartItems = localStorage.getItem('my-cart');
  return cartItems ? JSON.parse(cartItems) : [];
};


const Navbar = () => {
    const [showModal, setShowModal] = useState(false)
    const [showModal2, setShowModal2] = useState(false)
    const cart = document.getElementById('cart')
    const user = document.getElementById('user')
    
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
	<div className="text-lg font-bold">Unique Boutique</div>
	<div>
            <button
		id="user" 
          className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 items-center"
          onClick={() => setShowModal2(!showModal2)}
            > <Image src="/user.svg" width={20} height={20} alt='user'/>
            {showModal2 && createPortal (
		<ProfileClient onClose={() => setShowModal2(false)} />, user
	    )}
        </button>

            <button
		id="cart" 
          className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 items-center"
          onClick={() => setShowModal(!showModal)}
            > <Image src="/cart.svg" width={20} height={20} alt='cart'/>
            {showModal && createPortal (
		<ShoppingCart onClose={() => setShowModal(false)} />, cart
	    )}
        </button>
      </div>
    </nav>
  );
};

export {Navbar};

function ProfileClient() {
    const { user, error, isLoading } = useUser();
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
	user ?
	    <div className="absolute flex flex-col flex-wrap right-0 mt-8 mr-4 p-4 rounded-lg border shadow-lg">
		<div>
		    <img src={user.picture} alt={user.name} />
		    <h2>{user.name}</h2>
		    <p>{user.email}</p>
		    <p>{user.sub}</p>
		</div>
		<a href="/api/auth/logout">Logout</a>
	    </div>
	: <a href="/api/auth/login">Login</a>
    );
}

// ShoppingCart component with Tailwind CSS styles
const ShoppingCart = ({ onClose }) => {
    const cartItems = getCartItems();

    return (
	<div className="absolute flex flex-col flex-wrap right-0 mt-8 mr-4 p-4 rounded-lg border shadow-lg">
	    {cartItems.map((item, index) => (
		<div key={index} className="flex items-center mb-4">
		    {/* Use next/image component with square dimensions */}
		    <div className="w-16 h-16 mr-4">
			<Image src={`/images/productCatalouge/${item.image_location}`} width={160} height={160} alt={item.name} />
		    </div>
		    <div className="flex flex-col">
			<p className="text-lg font-semibold">{item.name}</p>
			<p className="text-sm text-gray-500">{item.size}</p>
			<p className="text-sm text-gray-500">{item.color}</p>
			<p className="text-lg">{item.price}</p>
		    </div>
		</div>
	    ))}
	    <button onClick={onClose}>Close</button>
	</div>
    );
};
