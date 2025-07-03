import { redirect } from "next/navigation";
import { checkRole } from "@/../utils/roles";
import ProductImageForm from "./productImage";
import Form from "./imageForm";
import ImageBank from "./imageDisplay";
import BothOrders from "./order";
import {getAllProducts} from '@/app/utils'


export default async function AdminDashboard() {
    if (!checkRole("admin")) {
        redirect("/");
    }
    const prod = await getAllProducts();
    return (
        <div className="min-h-screen   p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <header className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 ">Admin Dashboard</h1>
                    <p className="text-gray-600 ">
                        This page is restricted to users with the 'admin' role
                    </p>
                </header>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <section className="rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold text-gray-800  mb-4">
                                Product Image Upload
                            </h2>
                            <ProductImageForm />
                        </section>
                        <section className="rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold text-gray-800  mb-4">Form Section</h2>
                            <Form products={prod}/>
                        </section>
                    </div>
                    <div className="space-y-6">
                        <section className="rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold text-gray-800  mb-4">Create and Upload products</h2>
                            <ImageBank/>
                        </section>
                        <section className="rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold text-gray-800  mb-4">Orders</h2>
                            <BothOrders />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

