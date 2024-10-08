import { redirect } from "next/navigation";
import { checkRole } from "@/../utils/roles";
import ProductImageForm from "./productImage"
import Form from "./imageForm"
import ImageBank from "./imageDisplay"
import BothOrders from "./order";

export default function AdminDashboard() {
    if (!checkRole("admin")) {
	redirect("/");
    }
    return (
	<>
	    <h1>This is the admin dashboard</h1>
	    <p>This page is restricted to users with the 'admin' role.</p>
	    <ProductImageForm/>
	    <Form/>
	    <ImageBank/>
	    <BothOrders/>
	</>
    );
}
