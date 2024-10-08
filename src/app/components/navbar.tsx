import ShoppingCart from '@/app/components/cart'
import USC from "@/app/components/USC"
import { authManage } from '@/app/utils';
import { currentUser } from '@clerk/nextjs/server';
import {
    SignedIn,
    SignedOut,
    SignInButton,
} from "@clerk/nextjs";
import Users from "@/app/components/user"

export async function Navbar() {
    
    const user = await currentUser();
    if(user){
	const username = user.id
	const Email = user.emailAddresses[0]?.emailAddress;
	const name = user.username
	
	await authManage(Email, name, username)
    }
    return (
	<nav className="sticky top-0 w-full flex items-center justify-between p-4 bg-gray-800 text-white mb-8">
	    <div className="text-lg font-bold">Unique Boutique</div>
	    <div>
		<SignedIn>
		    {

		    }
		    <Users/>
		</SignedIn>
		<SignedOut>
		    {/* Signed out users get sign in button */}
		    <SignInButton/>
		</SignedOut>
		<USC/>
		<ShoppingCart/>
	    </div>
	</nav>
    );
};


