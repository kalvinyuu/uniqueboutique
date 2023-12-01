import { productCatalouge, colour, ribbon, mensSize, womansSize, kidsSize} from '@/db/schema'; 
import { db } from "@/db/index";
import { eq } from 'drizzle-orm';
import Image from 'next/image'
import ItemForm from '@/app/[item]/itemForm'
import { Size, Colour, Ribbon, Product } from "@/app/types"
import { CartProvider } from "@/app/components/cartContext"

export default async function Page({ params }: { params: { item: number } }) {
    const product = await db.query.productCatalouge.findFirst({
        where: eq(productCatalouge.id, params.item)
    });

    const colourTable: Colour = await db.select().from(colour);
    
    let size: Size = [{size_id: 1,
		       size:"M"}]

    let ribbonTable: Ribbon = []

    async function findSizeCategory(): Promise<void> {
	const category = product?.category ;
	switch(category) {
	    case "mens":
		size = await db.select().from(mensSize);
		break;
	    case "womans":
		size = await db.select().from(womansSize);
		ribbonTable = await db.select().from(ribbon)
		break;
	    case "kids":
		size = await db.select().from(kidsSize);
		ribbonTable = await db.select().from(ribbon)
		break;
	    default:
		break;
	}
    }

    await findSizeCategory()
    return (
	<CartProvider>
        <div className="flex flex-row">

            {product ? (
                <div className="justify-center products-center">
		    
		<p className ="text-xl">{product.name}</p>
                    <Image
                        src={`/images/productCatalouge/${product.image_location}`}
                        width={500}
                        height={500}
                        alt="Picture of the author"
                    />
                    <p>{product.price}</p> 
		    <ItemForm product={product}
			      size={size}
			      ribbonTable={ribbonTable}
			      colourTable={colourTable} /> 
                </div>
            ) : (
                <div>No product found</div>
            )} 
        </div>
    </CartProvider>
    );
}
