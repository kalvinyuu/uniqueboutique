'use client'
import { useState } from 'react';
import { useFormState } from 'react-dom'; // Assuming this is the correct import
import { createProduct } from '@/app/actions';
import ProductImageForm from '@/app/dashboard/productImage' 
const initialState = {
    message: ''
};

export default function Crud() {
    const [state, submit] = useFormState(createProduct, initialState);
    const [imageURL, setImageURL] = useState('');

    function handleClick(e) {
	setImageURL(e.target.value)
    }

    return (
        <>
            <div>
                <form action={submit}>
                    <label htmlFor="name">Name:</label>
                    <input className="text-black" type="text" id="name" name="name" />

                    <label htmlFor="price">Price:</label>
                    <input className="text-black" type="text" id="price" name="price" />

                    <label htmlFor="category">Category:</label>
                    <select className="text-black" id="category" name="category">
                        <option value="">Select Category</option>
                        <option value="mens">Mens</option>
                        <option value="womens">Womens</option>
                        <option value="kids">Kids</option>
                    </select>

                    <div className="grid justify-center">

                    </div>

		    
                    <label htmlFor="imageLocation">Image Location:</label>
		    <ProductImageForm
		    onDo={handleClick} />
                    <input value={imageURL}  className="text-black" type="text" id="imageLocation" name="imageLocation" readOnly={true} />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}
