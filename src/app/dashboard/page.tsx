import { redirect } from "next/navigation";
import { checkRole } from "@/../utils/roles";
import { clerkClient } from "@clerk/nextjs";
import { setRole } from "@/app/actions";
import Crud from "./crud"
import Form from "./imageForm"

export default function AdminDashboard(params: {
  searchParams: { search?: string };
}) {

  if (!checkRole("admin")) {
    redirect("/");
  }

  return (
    <>
      <h1>This is the admin dashboard</h1>
      <p>This page is restricted to users with the 'admin' role.</p>
      <Crud/>
      <Form/>
    </>
  );
}
