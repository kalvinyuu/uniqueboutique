import USC from "@/app/components/USC";
import { authManage } from "@/app/actions";
import { currentUser } from "@clerk/nextjs/server";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Users from "@/app/components/user";
import Image from "next/image";
import Link from "next/link";

export default async function NavContent() {
  const user = await currentUser();

  if (user) {
    const id = user.id;
    const Email = user.emailAddresses[0]?.emailAddress;
    const name = user.username;

    authManage(Email, name, id);
  }
    console.log(user)
  return (
      <>
	  <div className="px-6 py-3 border-black border-x-2 border-t-2 shadow-md">
	      <h1>
		  <Link
		      href="/"
		      className="text-gray-700 font-[comic-sans] hover:underline text-2xl"
		      style={{ fontVariant: "small-caps" }}
		  >
		      Unique Boutique
		  </Link>
      </h1>
      </div>
      <nav className="flex sticky top-0 w-full items-center justify-between border-2 border-black shadow-md h-16 ">
	  <div className="flex items-center  h-full divide-x divide-black divide-x-2 border-r-2 border-black">
	      {["kids", "mens", "womens", "seasonal"].map((category) => (
		  <Link
		      key={category}
		      href={`/${category}`}
		      className="flex-grow text-gray-700 hover:text-black font-medium h-full flex items-center justify-center divide-x divide-black divide-x-2 px-6"
		      style={{ fontVariant: "small-caps" }}
		  >
		      {category}
		  </Link>
	      ))}
	  </div>
	  <div className="flex bg-gray-50 py-2 ml-8 shadow-md w-1/3 max-w-md ">
	      <input
		  type="text"
		  placeholder="Search..."
		  className="bg-transparent w-full outline-none text-sm text-gray-700 "
	      />
	      <Image
		  src="/search-icon.svg" // Replace with your actual icon or SVG path
		  alt="Search"
		  width={16}
		  height={16}
		  className="ml-2 text-gray-500"
	      />
	  </div>
	  <div className="flex items-center space-x-4 px-6">
              <SignedIn>
		  <Users />
	      </SignedIn>
	      <SignedOut>
		  <SignInButton>
		      <button
			  className=" text-gray-700 hover:text-black"
			  style={{ fontVariant: "small-caps" }}> 
			  sign in
		      </button>
		  </SignInButton>
	      </SignedOut>
	      <USC />
	  </div>
      </nav>
      </>
  );
}
