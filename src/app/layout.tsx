'use client'
import './globals.css'
import  {Navbar}  from "@/app/components/navbar";
import CartProvider from './components/providers'
import { ClerkProvider } from '@clerk/nextjs'
 
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
	<html lang="en">
	    <body className="overflow-x-hidden">
		<ClerkProvider>
		<CartProvider>
			<Navbar />
			{children}
		</CartProvider>
		</ClerkProvider>
	    </body>
	</html>
    )
}
