"use client"
import { Size, Colour, Ribbon, Product, StripeProduct } from "@/app/types"
import { useState } from 'react';
import { products } from "@/app/data/products"
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'


export default function ItemForm({
    product, size, colourTable, ribbonTable}: {
	product: Product, size: Size, colourTable: Colour, ribbonTable: Ribbon }) { 
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColour, setSelectedColour] = useState<string>('');
    const [selectedRibbon, setSelectedRibbon] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');
    const { addItem } = useShoppingCart()

    function getObjectById(array:StripeProduct[], id:string) {
	return array.find(item => item.id === id);
    }

    
    // Example usage
    const stripeProduct = getObjectById(products, product.id.toString());
    
    const addToCart = () => {
	if (stripeProduct) {
	    addItem(stripeProduct, {
		count: 1,
		product_metadata: {
		    size: selectedSize,
		    msg: message,
		    colour: selectedColour,
		    ribbon: selectedRibbon,
		}
	    });
	} else {
	    console.error("Product not found!"); // Or handle the case where the product is not found
	}
    };


    return (
	<div>
	    <div className="flex flex-col ml-4">
		<label className="block">
		    What size are you?
		    <select onChange={(e) => setSelectedSize(e.target.value)}>
			<option value="">Select Size</option>
			{size.map((s) => (
			    <option key={s.sizeId} value={s.size}>
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
			    <option key={c.colourId} value={c.colour}>
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
				<option key={r.ribbonId} value={r.ribbon}>
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
		<button className="mt-4" onClick={addToCart} disabled={!selectedSize || !selectedColour}>
		    Add to Cart
		</button>
	    </div>
	</div>
    );
};
