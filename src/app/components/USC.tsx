"use client"
import ShoppingCart from '@/app/components/cart';
import {useShoppingCart} from "use-shopping-cart"
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

export default function USC() {
    const {handleCartClick} = useShoppingCart()
    const [showCart, setShowCart] = useState(false);
    return (
	<>
	<button onClick={() => {handleCartClick();setShowCart(true)}}
	className="rounded-md hover:bg-pink-100 items-center">
	<Image src="/cart.svg" width={30} height={30} alt='cart' />
	</button>
	{showCart && createPortal(
	    <ShoppingCart onClose={() => setShowCart(false)} />,
	    document.body
	)}
	</>
    )
} 
