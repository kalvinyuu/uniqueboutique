'use client'
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import { checkRole } from "@/../utils/roles";
import { clerkClient } from "@clerk/nextjs";
import { setRole, createProduct } from "./_actions";
import { useState } from 'react';

export default function AdminDashboard(params: {
  searchParams: { search?: string };
}) {
  const router = useRouter();

  if (!checkRole("admin")) {
    redirect("/");
  }
    type InputEvent = React.ChangeEvent<HTMLInputElement>;
    
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageLocation, setImageLocation] = useState('');
  const [category, setCategory] = useState('');

const handleNameChange = (e: InputEvent) => {
  const inputValue = e.target.value;
  const formattedName = inputValue
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  setName(formattedName);
};

  const handlePriceChange = (e: InputEvent) => {
    setPrice(e.target.value);
  };

  const handleImageLocationChange = (e: InputEvent) => {
    setImageLocation(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleSubmit = () => {
    if (name.trim() === '' || price.trim() === '' || imageLocation.trim() === '' || category === '') {
      alert('Please fill in all fields.');
    } else {
      console.log('Form submitted with the following data:', { name, price, imageLocation, category });
    }
  };
    createProduct(name, price, imageLocation, category)
  return (
    <>
      <h1>This is the admin dashboard</h1>
      <p>This page is restricted to users with the 'admin' role.</p>

      {/* Form component */}
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={handleNameChange} />

        <label htmlFor="price">Price:</label>
        <input type="text" id="price" name="price" value={price} onChange={handlePriceChange} />

        <label htmlFor="imageLocation">Image Location:</label>
        <input type="text" id="imageLocation" name="imageLocation" value={imageLocation} onChange={handleImageLocationChange} />

        <label htmlFor="category">Category:</label>
        <select id="category" name="category" value={category} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          <option value="mens">Mens</option>
          <option value="womens">Womens</option>
          <option value="kids">Kids</option>
        </select>

        <button type="button" onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
}
