import Link from "next/link";

export default function Home() {
    return (
        <div className="mad-line flex flex-col items-center justify-center min-h-screen text-center w-full bg-fixed">
            <h1 className="text-4xl font-bold mb-4 text-pink-600 font-dancing">Welcome to Unique Boutique!</h1>
            <p className="text-lg mb-6 text-pink-500">
                Discover the cutest custom pajamas made just for you and your family!
            </p>
            <p className="text-lg mb-8 text-pink-500">
                Whether you're snuggling at home or having a fun sleepover, we've got the perfect pajamas to keep you cozy and stylish.
            </p>
            <Link href="/shop">
                <button className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition duration-200">
                    Shop Now
                </button>
            </Link>
        </div>
    );
}
