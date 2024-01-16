import {getAllProducts} from '@/app/utils'
import Image from 'next/image'
import Link from "next/link";

export default function Home() {
  return (
      <div className="overflow-hidden">
	  <div>
	      {/* Other content of your app */}
	  </div>
	  <Products/>
      </div>
  )
}
async function Products() {
    try{
	const products = await getAllProducts();
	console.log(products)
	return (
	    <div className="grid">
	    {products.map(product => (
		<div key={product.id} className="justify-center products-center">
		    <Link href={`/${product.id}`}> 
			<Image
			src={`/images/productCatalouge/${product.imageLocation}`}
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
