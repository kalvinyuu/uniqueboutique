import { createProduct } from '@/app/actions';
import {getImages} from "@/app/utils"
import {Images} from "@/app/types"
import Image from "next/image"

export default async function Crud() {
    const images: Images[] = await getImages();

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
			{images.map(image => (
			    <div key={image.imageId} className="justify-center products-center mx-4 my-2">
				<button value={image.url} >
				    <Image className="object-cover" src={image.url} alt="pjs" width={200} height={200} />
				</button>
			    </div>
			))}
		    </div>


                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}
