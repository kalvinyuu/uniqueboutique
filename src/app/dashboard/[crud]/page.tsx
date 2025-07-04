import { createProduct } from '@/app/actions';
import Image from "next/image"
import { getImage } from "@/app/utils"


export default async function Crud({ p1arams }: { params: Promise<{ crud: string }> }) {
    const image = await getImage(parseInt((await params).crud, 10))

    return (
        <>
            <div>
                <form action={createProduct}>
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
		    <div className="grid justify-center">
			<Image src={image.url} alt="pjs" width={200} height={200} />
			<input value={image.url}  className="text-black" type="text" id="imageLocation" name="imageLocation" readOnly={true} />				
		    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}
