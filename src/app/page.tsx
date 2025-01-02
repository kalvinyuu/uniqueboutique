import Link from "next/link";
import Shop from"@/app/components/shop"

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center w-full bg-fixed">
            <h1 className="mb-2 text-gray-700 ">Welcome to Unique Boutique!</h1>
            <p className="mb-2 text-gray-700">
                Discover the cutest custom pajamas made just for you and your family!
            </p>
            <p className="mb-2 text-gray-700">
                Whether you're snuggling at home or having a fun sleepover, we've got the perfect pajamas to keep you cozy and stylish.
            </p>
	    <Shop/>
        </div>
    );
}
