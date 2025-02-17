import {getAllProducts} from '@/app/utils'
import Image from 'next/image'
import Link from "next/link";

export default async function Products() {
    try{
	const products = await getAllProducts();
	return (
	    <div className="overflow-hidden text-gray-700 grid justify-center">
		{products.map(product => (
		    <div key={product.id} className="justify-center products-center mx-4 my-2">
			<Link href={`/${product.id}`}> 
			    <Image
				src={`${product.imageLocation}`}
				width={300}
				height={400}
				    alt="Picture of the author"
				    sizes="(min-width: 420px) 300px, calc(96vw - 84px)"
				    priority
			    />
			    <p>
				{product.name}
			    </p>
			    <p>
				{product.price}
			    </p>
			</Link>
		    </div>
		))}
	    </div>
	)
    } catch (error) {
	console.error('Error fetching products:', error);
	// You might want to handle the error, e.g., display an error message
	return <div>Error fetching products</div>;
    }
}
