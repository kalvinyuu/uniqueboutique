"use client"
import { useEffect, useState } from "react";
import USC from "@/app/components/USC";
import { authManage } from '@/app/actions';
import { useUser } from '@clerk/nextjs';
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Users from "@/app/components/user";
import Image from 'next/image';
import Link from 'next/link';

export  function Navbar() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0); 
    const { user } = useUser()

    const controlNavbar = () => {
	if (typeof window !== "undefined") {
	    if (window.scrollY < lastScrollY) {
		setIsVisible(true);
	    } else {

		setIsVisible(false);
	    }
	    setLastScrollY(window.scrollY);
	}
    };

    useEffect(() => {
	if (typeof window !== "undefined") {
	    window.addEventListener("scroll", controlNavbar);
	    return () => {
		window.removeEventListener("scroll", controlNavbar);
	    };
	}
    }, [lastScrollY]);
    
    if (user) {
	
        const id = user.id;
        const Email = user.emailAddresses[0]?.emailAddress;
        const name = user.username;

        authManage(Email, name, id);
    }
    return (
        <nav className={`mad-line-navbar sticky top-0 w-full flex items-center justify-between p-4 bg-pink-100 text-pink-600 border-b-2 border-white shadow-md dark:bg-purple-200 bg-fixed ${isVisible ? "translate-y-0" : "-translate-y-full"} `}>
            <div className="flex items-center space-x-4">
		<div className="text-lg font-semibold font-dancing">Unique Boutique</div>
		<Link className="flex items-center hover:bg-pink-100 transition duration-200 rounded-xl" href="https://facebook.com">
		    <Image
			src="/facebook.svg"
			width={30} // Adjusted width
			height={30} // Adjusted height
			className="h-8 w-8" // Matches text height
			alt="facebook link"
		    />
		</Link>
		<Link className="flex items-center hover:bg-pink-100
		    rounded-xl transition duration-200" href="https://instagram.com">
		    <Image
			src="/instagram.svg"
			width={30} // Adjusted width
			height={30} // Adjusted height
			className="h-8 w-8" // Matches text height
			alt="instagram link"
		    />
		</Link>
            </div>
            <div className="flex items-center space-x-4">
		<SignedIn>
		    <Users />
		</SignedIn>
		<SignedOut>
		    <SignInButton>
			Sign In
		    </SignInButton>
		</SignedOut>
		<USC/>
            </div>
        </nav>
    );
}
