'use client'
import './globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import  {Navbar}  from "@/app/components/navbar";
import React from 'react'



export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
	<html lang="en">
	    <body className="overflow-x-hidden">
		<UserProvider>
		    <Navbar />
		    {children}
		</UserProvider>
	    </body>
	</html>
    )
}
