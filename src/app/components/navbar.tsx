"use client"
import { useEffect, useState } from "react";


export default function Navbar({
  children,
}: {
  children: React.ReactNode;
}) {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0); 

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
    return (
        <nav className={`mad-line-navbar sticky top-0 w-full flex items-center justify-between p-4 bg-pink-100 text-pink-600 border-b-2 border-white shadow-md dark:bg-purple-200 bg-fixed ${isVisible ? "translate-y-0" : "-translate-y-full"} `}>
	    {children}
        </nav>
    );
}

