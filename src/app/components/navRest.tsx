import USC from "@/app/components/USC";
import { authManage } from '@/app/actions';
import { currentUser } from '@clerk/nextjs/server'
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Users from "@/app/components/user";
import Image from 'next/image';
import Link from 'next/link';


export default  async function NavContent() {
    const user = await currentUser()
    if (user) {
	
        const id = user.id;
        const Email = user.emailAddresses[0]?.emailAddress;
        const name = user.username;

        authManage(Email, name, id);
    }
    return (
        <>
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
        </>
    );
}
