'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { createProductWithImage } from '@/app/actions';

const IMAGE_TYPES = [
    { value: 'product-main', label: 'Product Main Image' },
    { value: 'product-gallery', label: 'Product Gallery Image' },
    { value: 'category-banner', label: 'Category Banner' },
    { value: 'promotional', label: 'Promotional Image' }
];

function SubmitButton() {
    const { pending } = useFormStatus();
    
    return (
        <button 
            type="submit" 
            disabled={pending}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
            {pending ? 'Creating Product...' : 'Create Product'}
        </button>
    );
}

export default function SimplifiedForm() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setImageFile(file);
        
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Create Product</h2>
            
            <form action={createProductWithImage} className="space-y-4">
                {/* Product Details */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product name"
                    />
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        step="0.01"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.00"
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Category</option>
                        <option value="mens">Mens</option>
                        <option value="womens">Womens</option>
                        <option value="kids">Kids</option>
                    </select>
                </div>

                {/* Image Upload */}
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                        Product Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/jpeg,image/png,image/webp,image/avif"
                        onChange={handleFileChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Image Preview */}
                {previewUrl && (
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preview
                        </label>
                        <div className="border border-gray-300 rounded-md p-2">
                            <img 
                                src={previewUrl} 
                                alt="Preview" 
                                className="max-w-full h-48 object-contain mx-auto"
                            />
                        </div>
                    </div>
                )}

                {/* Image Metadata */}
                <div>
                    <label htmlFor="imageName" className="block text-sm font-medium text-gray-700 mb-1">
                        Image Name
                    </label>
                    <input
                        type="text"
                        id="imageName"
                        name="imageName"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter image name"
                    />
                </div>

                <div>
                    <label htmlFor="imageType" className="block text-sm font-medium text-gray-700 mb-1">
                        Image Type
                    </label>
                    <select
                        id="imageType"
                        name="imageType"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select an image type</option>
                        {IMAGE_TYPES.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="imageWidth" className="block text-sm font-medium text-gray-700 mb-1">
                            Width (px)
                        </label>
                        <input
                            type="number"
                            id="imageWidth"
                            name="imageWidth"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Width"
                        />
                    </div>
                    <div>
                        <label htmlFor="imageHeight" className="block text-sm font-medium text-gray-700 mb-1">
                            Height (px)
                        </label>
                        <input
                            type="number"
                            id="imageHeight"
                            name="imageHeight"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Height"
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <SubmitButton />
                </div>
            </form>
        </div>
    );
}
