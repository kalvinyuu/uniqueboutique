"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Users() {
  return (
    <>
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Action label="signOut" />
          <UserButton.Link
            label="View Order history"
            labelIcon={
              <Image
                src="/order.svg" // Replace this path with the correct path to your SVG
                alt="Order History"
                width={20}
                height={20}
              />
            }
            href="/orders"
          />
          <UserButton.Action label="manageAccount" />
        </UserButton.MenuItems>
      </UserButton>
    </>
  );
}
