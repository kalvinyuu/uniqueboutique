'use client';
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';
import Image from 'next/image';
import { Item } from '@/app/types';

export default function CartItem({ item }: { item: any }) {
  const { name, image, quantity, price, id } = item;
  const { removeItem } = useShoppingCart();
    const metaDataArray = Object.values(item.product_data.data);
  const removeItemFromCart = () => {
    removeItem(id);
  };

  return (
    <div className="flex flex-col mb-3">
      <div className="flex items-center gap-4">
        <Image alt={`${name}`} src={`/images/${image}`} width={50} height={50} />
        <div>
          {name} <span className="text-xs">({quantity})</span>
        </div>
        <div className="ml-auto">
          {formatCurrencyString({ value: price, currency: 'GBP' })}
        </div>
        <button
          onClick={() => removeItemFromCart()}
          className="hover:bg-emerald-50 transition-colors rounded-full duration-500 p-1"
        >
          <p>Remove Item</p>
        </button>
      </div>
      
      {/* Display each item's metadata on separate lines */}
      <div className="ml-16 mt-2">
        {metaDataArray.map((metaData:any , index:number) => {
          const { colour, msg, ribbon, size } = metaData;
          return (
            <div key={index} className="text-sm text-gray-500 border-b border-gray-200 py-2 last:border-0">
              <div className="font-medium text-gray-700">Item {index + 1}</div>
              {size && <div>Size: {size}</div>}
              {colour && <div>Colour: {colour}</div>}
              {ribbon && <div>Ribbon: {ribbon}</div>}
              {msg && <div>Message: {msg}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
