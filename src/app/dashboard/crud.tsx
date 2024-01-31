'use client'
import { useFormState } from "react-server-dom-webpack/server.edge";
import { createProduct } from "@/app/actions";


export default function Crud() {
  const [formState, submit] = useFormState({
    name: '',
    price: '',
    imageLocation: '',
    category: '',
  }, createProduct); // Pass createProduct as the action function



    function handleSubmit() {
	if (formState.name.trim() === '' ||formState.price.trim() === '' || formState.imageLocation.trim() === '' || formState.category === '') {
	    alert('Please fill in all fields.');
	} else {
	    console.log('Form submitted with errors try again');
	}
    };

    return (
	<>
	    <div>
		<form action={submit}>
		    <label htmlFor="name">Name:</label>
		    <input type="text" id="name" name="name"/>

		    <label htmlFor="price">Price:</label>
		    <input type="text" id="price" name="price"/>

		    <label htmlFor="imageLocation">Image Location:</label>
		    <input type="text" id="imageLocation" name="imageLocation"/>

		    <label htmlFor="category">Category:</label>
		    <select id="category" name="category">
			<option value="">Select Category</option>
			<option value="mens">Mens</option>
			<option value="womens">Womens</option>
			<option value="kids">Kids</option>
		    </select>
		    <button type="submit" onClick={handleSubmit}>Submit</button>
		</form>
	    </div>
	</>
    );
}
