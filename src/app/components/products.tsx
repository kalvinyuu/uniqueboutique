//'use client'
import getAllProducts from '@/lib/getProducts'

export default async function Product({count}:{count: number}) {
    const item: Product[] = await getAllProducts()
    return (
	<section className="flex flex-col justify-center products-center">
	    <div className="justify-center products-center">
		<a>
		    <Image
			src={`/productCatalouge${product.image_location}`}
			width={500}
			height={500}
			alt="Picture of the author"
		    />	
		    <p>
			{product.name}
		    </p>
		    <p>
			{product.price} 
		    </p>
		</a>
	    </div>
	</section>
    )
     
}

