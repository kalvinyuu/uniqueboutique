"use client"
import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Size, Colour, Ribbon, Product, CartItem, Cart, Action } from "@/app/types"




const CartContext = createContext<{
  cart: Cart;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

function CartProvider({ children }: {children: ReactNode}) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
    useEffect(() => {
    cart.length > 0
      ? localStorage.setItem("my-cart", JSON.stringify(cart))
      : localStorage.setItem("my-cart", JSON.stringify([]));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
 

function cartReducer(cart: Cart , action: Action): Cart {
  switch (action.type) {
    case 'ADD_TO_CART': {
      return [
        ...cart,
          {
	      id: action.id,
	      name: action.name,
              image_location: action.image_location,
              price: action.price,
              category: action.category,
              size: action.size,
              size_id: action.size_id,
              colour: action.colour,
              colour_id: action.colour_id,
              ribbon: action.ribbon,
              ribbon_id: action.ribbon_id,
	  }
	];
    }
    case 'REMOVE_FROM_CART':
      return cart.filter((crt) => crt.id !== action.id) 
    // Add other cases for cart-related actions if needed
  }
}



function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

let initialCart: Cart = [] 
if (typeof window !== "undefined") {
  const storedCart = localStorage.getItem("my-cart");
  if (storedCart) {
    initialCart = JSON.parse(storedCart) as Cart;
  }
}

export { CartProvider, useCart };
