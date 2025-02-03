"use client";
import { Size, Colour, Ribbon, Product, StripeProduct } from "@/app/types";
import { useState } from "react";
import { products } from "@/app/data/products";
import { useShoppingCart } from "use-shopping-cart";
import { useUser } from "@clerk/clerk-react";

export default function ItemForm({
    product,
    sizeTable,
    colourTable,
    ribbonTable,
}: {
    product: Product;
    sizeTable: Size;
    colourTable: Colour;
    ribbonTable: Ribbon;
}) {
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [selectedColour, setSelectedColour] = useState<number>(0);
    const [selectedRibbon, setSelectedRibbon] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    const [showSizeWarning, setShowSizeWarning] = useState<boolean>(false);
    const [showColourWarning, setShowColourWarning] = useState<boolean>(false);
    const [cartSuccess, setCartSuccess] = useState<boolean>(false);
    const [buttonText, setButtonText] = useState<string>("Add to Cart");

    const { user } = useUser();
    const { addItem, cartDetails } = useShoppingCart();

    function getObjectById(array: StripeProduct[], id: string) {
        return array.find((item) => item.id === id);
    }

    const stripeProduct = getObjectById(products, product.id.toString());

    function addToCart() {
        let showWarning = false;
        if (!selectedSize) {
            setShowSizeWarning(true);
            showWarning = true;
        }
        if (!selectedColour) {
            setShowColourWarning(true);
            showWarning = true;
        }
        if (showWarning) {
            setTimeout(() => {
                setShowSizeWarning(false);
                setShowColourWarning(false);
            }, 1000);
            return;
        }
	
        // Create new metadata for current item
        const newMetadata = {
            size: selectedSize,
            msg: message,
            productId: product.id,
            colour: selectedColour,
            ribbon: selectedRibbon,
            price: product.price,
        };
	
        // Get existing metadata for this product if it exists
        const existingItem = cartDetails?.[product.id];
        const existingMetadata = existingItem?.product_metadata?.data || [];
	
        if (stripeProduct) {
            // Create a unique ID for this specific product variation
            const uniqueId = `${product.id}-${Date.now()}`;
            
            // Create a new product object with the unique ID
            const uniqueProduct = {
                ...stripeProduct,
                id: uniqueId,
            };
	    
            addItem(uniqueProduct, {
                product_metadata: {
                    data: [newMetadata], // Each item has its own metadata
                    userID: user?.id
                },
                count: 1
            });

            setCartSuccess(true);
            setButtonText("Product Added!");

            setTimeout(() => {
                setCartSuccess(false);
                setButtonText("Add to Cart");
            }, 2000);
        } else {
            console.error("Product not found!");
        }
    }
    return (
	<div>
	    <div className="flex flex-col ml-4">
		<div>
		    <label className="block">
			What size are you?
			<select
			    onChange={(e) => setSelectedSize(e.target.value)}
			    className={`ml-2 ${showSizeWarning ? "border-2 border-black bg-zinc-50" : ""}`}
			>
			    <option value="">Select Size</option>
			    {sizeTable.map((s) => (
				<option key={s.id} value={s.size}>
				    {s.size}
				</option>
			    ))}
			</select>
		    </label>
		</div>
		<div>
		    <label className="block mt-4">
			What colour do you want?
			<select
			    onChange={(e) => setSelectedColour(Number(e.target.value))}
			    className={`ml-2 ${showColourWarning ? "border-2 border-black bg-zinc-50" : ""}`}
			>
			    <option value="">Select Colour</option>
			    {colourTable.map((c) => (
				<option key={c.id} value={c.id}>
				    {c.colour}
				</option>
			    ))}
			</select>
		    </label>
		</div>
		{ribbonTable && ribbonTable.length > 0 && (
		    <label className="block mt-4">
			Select a ribbon:
			<select onChange={(e) => setSelectedRibbon(Number(e.target.value))}>
			    {ribbonTable.map((r) => (
				<option key={r.id} value={r.id}>
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

		<button
	            onClick={addToCart}
		    className={`mt-4 text-white px-4 py-2 rounded-lg ${cartSuccess ? "bg-green-300" : "bg-pink-500"}`}
		>
		    {buttonText}
		</button>
	    </div>
	</div>
    );
}
