'use client'
import  { useFormState }  from "react-dom" 
import { createProduct } from "@/app/actions";
import { boolean } from "drizzle-orm/pg-core";

const initialState = {
    message: ""
}

//TODO
//implement useFormStatus and zod for validating

export default function Crud() {
    const [state, submit] = useFormState(
	createProduct,
	initialState); 



    /*function handleSubmit() {
	if (initialState.name === '' || initialState.price.trim() === '' || initialState.imageLocation.trim() === '' || initialState.category === '') {
	    alert('Please fill in all fields.');
	} else {
	    console.log('Form submitted with errors try again');
	}
    };*/

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
		    <button type="submit" >Submit</button>
		</form>
	    </div>
	</>
    );
}
