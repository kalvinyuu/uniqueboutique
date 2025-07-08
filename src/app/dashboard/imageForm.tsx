'use client';

import { useState } from 'react';
import { getSignedURL, getAllProducts } from '@/app/actions';
import { Product } from "@/app/types"
import { Crud } from "./crud"
const IMAGE_TYPES = [
    { value: 'product-main', label: 'Product Main Image' },
    { value: 'product-gallery', label: 'Product Gallery Image' },
    { value: 'category-banner', label: 'Category Banner' },
    { value: 'promotional', label: 'Promotional Image' }
];

export default function Form({products}: {products: Product[]}) {
    
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageWidth, setImageWidth] = useState<number | null>(null);
    const [imageHeight, setImageHeight] = useState<number | null>(null);
    const [imageName, setImageName] = useState<string>('');
    const [imageType, setImageType] = useState<string>('');
    const [productID, setProductID] = useState<number | null>(null);
    const [newProduct, setNewProduct] = useState('');
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setFile(file);
        } else {
            setPreviewUrl(null);
        }
    };
    
    const computeSHA256 = async (file: File) => {
        const buffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    };

    const handleFileUpload = async (file: File) => {
        const checksum = await computeSHA256(file);

        const signedURLResult = await getSignedURL({
            fileSize: file.size,
            fileType: file.type,
            checksum,
            name: file.name,
            type: 'product-image',
            width: imageWidth || 0,
            height: imageHeight || 0,
        });

        if (signedURLResult.failure) {
            throw new Error(signedURLResult.failure);
        }
        //@ts-ignore  
        const { url, id: fileId } = signedURLResult.success;
        await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': file.type },
            body: file,
        });

        return fileId;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            let fileId: number | undefined = undefined;

            if (file) {
                setStatusMessage('Uploading...');
                fileId = await handleFileUpload(file);
            }

            setStatusMessage('Upload successful');
        } catch (error) {
            console.error(error);
            setStatusMessage('Upload failed');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
	setNewProduct(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
            Select File:
            <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={handleFileChange}
            />
        </label>
            {previewUrl && (
                <div>
                    <img src={previewUrl} alt="Preview" />
                    </div>
            )}
            <label className="block text-sm font-medium text-gray-700">
            Image Name
            <input
        type="text"
        value={imageName}
        onChange={(e) => setImageName(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="Enter image name"
        required
            />
            </label>
            <label className="block text-sm font-medium text-gray-700">
            Image Type
            <select
        value={imageType}
        onChange={(e) => setImageType(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        required
            >
            <option value="">Select an image type</option>
            {IMAGE_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                {type.label}
                </option>
            ))}
        </select>
            </label>
            <label className="block text-sm font-medium text-gray-700">
            Associated Product (Optional)
            <select
        value={productID || ''}
        onChange={(e) => setProductID(e.target.value ? Number(e.target.value) : null)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
            <option value="">Select a product</option>
            {products.map((product) => (
                <option key={product.id} value={product.id}>
                    {product.name}
                </option>
	    ))}
	    <option value='NewProduct'>Create a new product</option>
	    {newProduct === 'NewProduct' && (
		<Crud/>
	    )}
        </select>
            </label>
            <label>
            Image Width (px):
            <input
        type="number"
        value={imageWidth || ''}
        onChange={(e) => setImageWidth(Number(e.target.value))}
        placeholder="Width"
            />
            </label>
            <label> 
            Image Height (px):
            <input
        type="number"
        value={imageHeight || ''}
        onChange={(e) => setImageHeight(Number(e.target.value))}
        placeholder="Height"
            />
            </label>
            <button type="submit" disabled={loading || !productID}>
            Upload
        </button>
            <p>{statusMessage}</p>
            </form>
    );
}
