import {getImages} from "@/app/utils"
import {Images} from "@/app/types"
import Image from "next/image"

export default async function ImageBank() {
    const images = await getImages();
    
    return (
        <div className="grid justify-center">
            {images.map(image => (
                <div key={image.imageId} className="justify-center products-center mx-4 my-2">
                                <Image className="object-cover" src={image.url} alt="pjs" width={200} height={200} />
                </div>
            ))}
        </div>
    );
}
