"use client"
import { Size, Colour, Ribbon, Product, Action } from "@/app/types"
import { useState } from 'react';
import { useCart } from "@/app/cartContext"

export default function ItemForm({product, size, colourTable,
					ribbonTable}: {product: Product, size: Size, colourTable: Colour, ribbonTable: Ribbon }) {

    const { dispatch } = useCart();
    
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColour, setSelectedColour] = useState<string>('');
    const [selectedRibbon, setSelectedRibbon] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');

const handleAddToCart = () => {
  const selectedSizeObj = size.find((s) => s.size === selectedSize).size_id;
  const selectedColourObj = colourTable.find((c) => c.colour === selectedColour).id;
  const selectedOptions = {
    id: product.id,
    name: product.name,
    image_location: product.image_location,
    price: product.price,
    category: product.category,
    size: selectedSize,
    size_id: selectedSizeObj,
    colour: selectedColour,
    colour_id: selectedColourObj,
    ribbon: selectedRibbon,
    ribbon_id: ribbonTable.find((r) => r.ribbon === selectedRibbon).ribbon_id, // Extract ribbon_id
    message: message,
  };
   
  dispatch({
    type: 'ADD_TO_CART',
    ...selectedOptions,
  });
    
};

	return (
	    <div>
		<div className="flex flex-col ml-4">
		    <label className="block">
			What size are you?
			<select onChange={(e) => setSelectedSize(e.target.value)}>
			    <option value="">Select Size</option>
			    {size.map((s) => (
				<option key={s.size_id} value={s.size}>
				    {s.size}
				</option>
			    ))}
			</select>
		    </label>
		    <label className="block mt-4">
			What colour do you want?
			<select onChange={(e) => setSelectedColour(e.target.value)}>
			    <option value="">Select Colour</option>
			    {colourTable.map((c) => (
				<option key={c.id} value={c.colour}>
				    {c.colour}
				</option>
			    ))}
			</select>
		    </label>
		    {ribbonTable && ribbonTable.length > 0 && (
			<label className="block mt-4">
			    Select a ribbon:
			    <select onChange={(e) => { console.log('Selected Ribbon:', e.target.value); setSelectedRibbon(e.target.value); }}>
				<option value="">Select Ribbon</option>
				{ribbonTable.map((r) => (
				    <option key={r.ribbon_id} value={r.ribbon}>
					{r.ribbon}
				    </option>
				))}
			    </select>
			</label>
		    )}
		    <label className="block mt-4">
			Enter a message:
			<input
			    type="text"
			    value={message}
			    onChange={(e) => setMessage(e.target.value)}
			    placeholder="Type your message here"
			/>
		    </label>
		    <button className="mt-4" onClick={handleAddToCart} disabled={!selectedSize || !selectedColour}>
			Add to Cart
		    </button>
		</div>
	    </div>
	);
    };
