import './globals.css';
import  Navbar  from '@/app/components/navbar';
import  NavContent  from "@/app/components/navRest"
import CartProvider from './components/providers';
import { ClerkProvider } from '@clerk/nextjs';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
      <html lang="en">
	  <body className="overflow-x-hidden bg-pink-100 font-sans  p-8 mx-auto max-w-7xl space-y-8">
              <ClerkProvider>
		  <CartProvider>
		      <Navbar>
			  <NavContent/>
		      </Navbar >
		      <main className="">
			  {children}
			  <SpeedInsights />
		      </main>
		      <footer className="bg-pink-100 py-6 text-center border-t-2 border-white ">
			  <p className="text-pink-600 ">Made with love at Unique Boutique</p>
			  <p>
			      <a href="#" className="text-pink-600 font-bold hover:underline ">Contact Us</a> |{' '}
			      <a href="#" className="text-pink-600 font-bold hover:underline ">Our Story</a>
			  </p>
		      </footer>
		      
		  </CartProvider>
              </ClerkProvider>
	  </body>
      </html>
  );
}
