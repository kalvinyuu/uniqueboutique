'use client'
import './globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import  {Navbar}  from "@/app/components/navbar";
import React from 'react'
import CartProvider from './components/providers'
import { usePathname } from "next/navigation";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
console.log("\n---", usePathname());
    return (
	<html lang="en">
	    <body className="overflow-x-hidden">
		<CartProvider>
		<UserProvider>
		    <Navbar />
		    {children}
		</UserProvider>
		</CartProvider>
	    </body>
	</html>
    )
}
