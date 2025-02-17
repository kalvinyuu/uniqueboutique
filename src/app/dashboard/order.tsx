import { Suspense } from 'react';
import { getOrders, getShippedOrders, getAddresses, getSpecItem, getOrderItems } from "@/app/utils";
import { UpdateOrderStat, UpdateShippedOrderStat } from "@/app/dashboard/updateOrderStatus";
import { centsToDollars } from "@/app/zod";
import { Orders } from "@/app/types";

export default async function BothOrders() {
    const shippedOrders: Orders[] = await getShippedOrders();
    const orders: Orders[] = await getOrders();
    
    return (
        <>
        <ShippedOrders orders={shippedOrders} />
        <OrderViewer orders={orders} />
        </>
    );
}

function ShippedOrders({ orders }: { orders: Orders[] }) {
    return (
        <div className="grid justify-center">
            {orders.map((order) => (
                <div key={order.id} className="justify-center products-center mx-4 my-2">
                    <div> Order ID: {order.id} </div>
                    <div> User ID: {order.userId} </div>
                    <div> Address ID: {order.addressId} </div>
                    <div> Order Date: {order.orderDate} </div>
                    <div> Total Amount: {centsToDollars(order.totalAmount)} </div>
                    <UpdateShippedOrderStat ID={order.id} />
                    <OrderItemsViewer orderID={order.id} />
                    <AddressViewer addressID={order.addressId} />
                </div>
            ))}
        </div>
    );
}

function OrderViewer({ orders }: { orders: Orders[] }) {
    return (
        <div className="grid justify-center">
            {orders.map((order) => (
                <div key={order.id} className="justify-center products-center mx-4 my-2">
                    <div> Order ID: {order.id} </div>
                    <div> User ID: {order.userId} </div>
                    <div> Address ID: {order.addressId} </div>
                    <div> Order Date: {order.orderDate} </div>
                    <div> Total Amount: {centsToDollars(order.totalAmount)} </div>
                    <UpdateOrderStat ID={order.id} />
                    <OrderItemsViewer orderID={order.id} />
                    <AddressViewer addressID={order.addressId} />
                </div>
            ))}
        </div>
    );
}

async function AddressViewer({ addressID }: { addressID: number }) {
    const address = await getAddresses(addressID);

    return (
        <div>
            <h4>Shipping Address:</h4>
            <div>Name: {address.name}</div>
            <div>Street: {address.streetAddress}</div>
            <div>City: {address.city}</div>
            <div>Postcode: {address.postCode}</div>
            <div>Country: {address.country}</div>
        </div>
    );
}

async function OrderItemsViewer({ orderID }: { orderID: number }) {
    const orderItems = await getOrderItems(orderID);
    return (
        <div>
            {orderItems.map((item) => (
                <div key={item.id}>
                    <Suspense fallback={<div>Loading Item Details...</div>}>
                        <SpecificItem ID={item.specificItemId} />
                    </Suspense>
                    <div>Price: {item.price}</div>
                </div>
            ))}
        </div>
    );
}

async function SpecificItem({ ID }: { ID: number }) {
    const item = await getSpecItem(ID);

    return (
        <div>
            <div>Size: {item.size}</div>
            <div>Colour: {item.colour}</div>
            <div>Ribbon: {item.ribbon}</div>
            <div>Message: {item.message}</div>
        </div>
    );
}
