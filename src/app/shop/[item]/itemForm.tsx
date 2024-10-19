"use client";
import { Size, Colour, Ribbon, Product, StripeProduct } from "@/app/types";
import { useState } from "react";
import { products } from "@/app/data/products";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { useUser } from "@clerk/clerk-react";

export default function ItemForm({
  product,
  size,
  colourTable,
  ribbonTable,
}: {
  product: Product;
  size: Size;
  colourTable: Colour;
  ribbonTable: Ribbon;
}) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColour, setSelectedColour] = useState<number>(0);
  const [selectedRibbon, setSelectedRibbon] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [productMetadata, setProductMetadata] = useState<
    Array<{ size: string; msg: string; productId: number; colour: number; ribbon: number }>
  >([]);
  const [showSizeWarning, setShowSizeWarning] = useState<boolean>(false);
  const [showColourWarning, setShowColourWarning] = useState<boolean>(false);
  const [cartSuccess, setCartSuccess] = useState<boolean>(false); // Success state
  const [buttonText, setButtonText] = useState<string>("Add to Cart"); // Button text

  const { user } = useUser();
  const { addItem } = useShoppingCart();

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

  const newMetadata = {
    size: selectedSize,
    msg: message,
    productId: product.id,
    colour: selectedColour,
    ribbon: selectedRibbon,
    price: product.price,
  };

  setProductMetadata((prevMetadata) => [...prevMetadata, newMetadata]);

  if (stripeProduct) {
    addItem(stripeProduct, {
      count: 1,
      product_metadata: { data: [...productMetadata, newMetadata], userID: user?.id },
    });

    // Set button text and success state
    setCartSuccess(true);
    setButtonText("Product Added!");
    
    // Check if cartSuccess is true
    console.log("Cart Success State:", cartSuccess);  // Check if this prints `true`

    // Hide the success message and reset the button text after 2 seconds
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
			    {size.map((s) => (
				<option key={s.sizeId} value={s.size}>
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
				<option key={c.colourId} value={c.colourId}>
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
			    <option value="">Select Ribbon</option>
			    {ribbonTable.map((r) => (
				<option key={r.ribbonId} value={r.ribbonId}>
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
