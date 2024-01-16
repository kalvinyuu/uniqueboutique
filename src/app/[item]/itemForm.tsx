"use client"
import { Size, Colour, Ribbon, Product, StripeProduct } from "@/app/types"
import { useState } from 'react';

export default function ItemForm({
    product, size, colourTable, ribbonTable}: {
	product: Product, size: Size, colourTable: Colour, ribbonTable: Ribbon }) { 
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [selectedColour, setSelectedColour] = useState<string>('');
    const [selectedRibbon, setSelectedRibbon] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');


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
	    </div>
	</div>
    );
};
