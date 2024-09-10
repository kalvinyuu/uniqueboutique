"use client"
import {useShoppingCart} from "use-shopping-cart"
import Image from 'next/image';

export default function USC(){
    const {handleCartClick} = useShoppingCart()
    return (
	<button 
	    onClick={() => handleCartClick()}
	    className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 items-center">
	    <Image src="/cart.svg" width={20} height={20} alt='cart' />
	</button>
    )
}
