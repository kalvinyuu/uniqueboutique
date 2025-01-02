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
	<>
        <div className={`${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
	    {children}
        </div>
	</>
    );
}

