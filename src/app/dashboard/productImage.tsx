import {getImages} from "@/app/utils"
import {Images} from "@/app/types"
import Image from "next/image"
import Link from "next/link"

export default async function ProductImageForm() {
    const images: Images[] = await getImages();
       return (
        <div className="grid justify-center">
            {images.map(image => (
                <div key={image.id} className="justify-center products-center mx-4 my-2">
		    <Link href={`/dashboard/${image.id}`}>
                        <Image className="object-cover" src={image.url} alt="pjs" width={200} height={200} />
		    </Link>
                </div>
            ))}
        </div>
    );\
}
