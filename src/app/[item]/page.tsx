import Image from 'next/image'
import ItemForm from '@/app/[item]/itemForm'
import { getProduct, getColourTable, getSizeCategory } from "@/app/utils"

export default async function Page({ params }: { params: Promise<{ item: string }> }) {
    const itemId = parseInt((await params).item, 10)
    const product = await getProduct(itemId)
    const { size, ribbonTable } = await getSizeCategory(itemId);
    const colourTable = await getColourTable()
    return (
        <div  className="flex flex-row">

            {product ? (
                <div className="justify-center products-center">
		    
		<p className ="text-xl">{product.name}</p>
                    <Image
                        src={`${product.imageLocation}`}
                        width={500}
                        height={500}
                        alt="Picture of the author"
			    loading="eager"
			priority
                    />
                    <p>{product.price}</p> 
		    <ItemForm product={product}
		    	      sizeTable={size}
			      ribbonTable={ribbonTable}
			      colourTable={colourTable}/> 
                </div>
            ) : (
                <p>No product found</p>
            )} 
        </div>
    );
}
