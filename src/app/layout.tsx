import './globals.css';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import  Navbar  from '@/app/components/navbar';
import  NavContent  from "@/app/components/navRest"
import CartProvider from './components/providers';
import { ClerkProvider } from '@clerk/nextjs';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
    title: 'Unique Boutique - Custom Pajamas',
    description: 'Create your dream pajamas at Unique Boutique!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
	<ClerkProvider>
	<html lang="en">
	    <body className="overflow-x-hidden bg-white font-sans text-black p-8 mx-auto max-w-7xl space-y-8">
		<CartProvider>
		    <header>
			<Navbar>
			    <NavContent/>
			</Navbar >
		    </header>
		    <main className="">
			{children}
			<SpeedInsights />
		    </main>
		    <footer className="py-6 text-center border-t-2 border-white ">
			<p className="text-gray-700 ">Made with love at Unique Boutique</p>
			<p>
			    <a href="#" className="text-gray-700 font-bold hover:underline ">Contact Us</a> |{' '}
			    <a href="#" className="text-gray-700 font-bold hover:underline ">Our Story</a>
			</p>
			<div className="flex justify-center space-x-4 mt-4">
			    <Link href="https://facebook.com" className="text-gray-700 hover:text-pink-500">
				<FontAwesomeIcon icon={faFacebook} size="2x" />
			    </Link>
			    <Link href="https://instagram.com" className="text-gray-700 hover:text-pink-500">
				<FontAwesomeIcon icon={faInstagram} size="2x" />
			    </Link>
			</div>
		    </footer>
		</CartProvider>
	    </body>
	</html>
	</ClerkProvider>
    );
}
