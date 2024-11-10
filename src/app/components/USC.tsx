"use client";
import ShoppingCart from "@/app/components/cart";
import { useShoppingCart } from "use-shopping-cart";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export default function USC() {
  const { handleCartClick, cartCount } = useShoppingCart(); // Get cartCount
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  // Close the cart on scroll
  useEffect(() => {
    function handleScroll() {
      if (showCart) setShowCart(false);
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showCart]);

  // Close the cart on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCart(false);
      }
    }

    if (showCart) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCart]);

  return (
    <div className="relative">
      <button
        onClick={() => {
          handleCartClick();
          setShowCart(true);
        }}
        className="rounded-md hover:bg-pink-100 relative"
      >
        <Image src="/cart.svg" width={30} height={30} alt="cart" />
        {cartCount ? ( 
          <span className="absolute -top-2 -right-2 bg-blue-400 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {cartCount}
          </span>
        ) : null}
      </button>

      {showCart &&
        createPortal(
          <div
            ref={cartRef} // Attach the ref to the cart container
            className="fixed top-10 right-10 w-80 h-auto bg-white shadow-lg z-50 rounded-lg"
          >
            <ShoppingCart onClose={() => setShowCart(false)} />
          </div>,
          document.body
        )}
    </div>
  );
}
