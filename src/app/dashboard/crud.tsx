import Image from "next/image";
import { getImage } from "@/app/utils";
import { createProduct } from "@/app/actions" // Adjust path as needed

export default async function Crud({ params }: { params: { crud: number } }) {
    const image = await getImage(params.crud);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission
        const formData = new FormData(event.currentTarget);

        // Call the server action manually
        try {
            await createProduct(formData);
            console.log("Product created successfully!");
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input className="text-black" type="text" id="name" name="name" required />
                <label htmlFor="price">Price:</label>
                <input className="text-black" type="number" id="price" name="price" required />
                <label htmlFor="category">Category:</label>
                <select className="text-black" id="category" name="category" required>
                    <option value="">Select Category</option>
                    <option value="mens">Mens</option>
                    <option value="womens">Womens</option>
                    <option value="kids">Kids</option>
                </select>
                <label htmlFor="imageLocation">Image Location:</label>
                <div className="grid justify-center">
                    <Image src={image.url} alt="pjs" width={200} height={200} />
                    <input
                        value={image.url}
                        className="text-black"
                        type="text"
                        id="imageLocation"
                        name="imageLocation"
                        readOnly
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
