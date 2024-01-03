import getAllProducts from '@/lib/getProducts'
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
  const products = await getAllProducts();
    console.log(products)
  return (
      <div className="grid">
      {products.map(product => (
	    <div className="justify-center products-center">
		<Link href={`/${product.id}`}>
		    <Image
			src={`/images/productCatalouge/${product.image_location}`}
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
} 
