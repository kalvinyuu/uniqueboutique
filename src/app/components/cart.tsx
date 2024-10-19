import { useShoppingCart } from 'use-shopping-cart'
import CartItem from './CartItem'
import CheckoutButton from './checkoutButton'
import { Item } from "@/app/types" 

export default function ShoppingCart({ onClose }:any) {
    const { shouldDisplayCart, cartCount, cartDetails } = useShoppingCart();
  
  return (
    <div
      className='bg-white text-black flex flex-col absolute right-3 md:right-9 top-14 w-80 py-4
        px-4 shadow-[0_5px_15px_0_rgba(0,0,0,.15)] rounded-md transition-opacity duration-500'>
      
      {cartCount && cartCount > 0 ? (
        <> 
          {Object.values(cartDetails ?? {}).map((entry) => (
            <CartItem key={entry.id} item={entry as Item} />
          ))}
          <CheckoutButton />
        </>
      ) : (
        <div className="p-5">You have no items in your cart</div>
      )}

      <button onClick={onClose} className="mt-4 p-2 bg-pink-200 rounded-md">
        Close
      </button>
    </div>
  );
}

