import { getCustomerOrders, getUserID, getAddresses, getSpecItem, getOrderItems } from "@/app/utils";
import { currentUser } from '@clerk/nextjs/server';
import { z } from 'zod';
import { centsToDollars  } from "@/app/zod"


export default async function orderHistory() {
    const user = await currentUser();
    if (!user) {
        return (
            <div>
                <h1>Please login to see your order history on this account!</h1>
            </div>
        );
    }
    try {
        const numberPromise = z.promise(z.number());
        const userID = await numberPromise.parse(Promise.resolve(getUserID(user.id)));
        const orders = await getCustomerOrders(userID);
        return (
            <div className="grid justify-center">
                {orders.map((order) => (
                    <div key={order.id} className="justify-center products-center mx-4 my-2">
                        <div> Order Date: {order.orderDate} </div>
                        <div> Total Amount: {centsToDollars(order.totalAmount)} </div>
                        <OrderItemsViewer orderID={order.id} />
                        <AddressViewer addressID={order.addressId} />
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        console.error('Error fetching order history:', error);
        return (
            <div>
                <h1>Unable to retrieve your order history. Please try again later.</h1>
            </div>
        );
    }
}



export async function SpecificItem({ ID }: { ID: number }) {
    try {
        const item = await getSpecItem(ID);
        return (
            <div>
                <div>Size: {item.size}</div>
                <div>Colour: {item.colour}</div>
                <div>Ribbon: {item.ribbon}</div>
                <div>Message: {item.message}</div>
            </div>
        );
    } catch (error) {
        return <div>{(error as Error).message}</div>;
    }
}

export async function AddressViewer({ addressID }: { addressID: number }) {
    try {
        const address = await getAddresses(addressID);

        return (
            <div className="">
                <h4>Shipping Address:</h4>
                <div>Name: {address.name}</div>
                <div>Street: {address.streetAddress}</div>
                <div>City: {address.city}</div>
                <div>Postcode: {address.postCode}</div>
                <div>Country: {address.country}</div>
            </div>
        );
    } catch (error) {
        return <div>{error.message}</div>;
    }
}

export async function OrderItemsViewer({ orderID }: { orderID: number }) {
    try {
        const orderItems = await getOrderItems(orderID);
        return (
            <div>
                {orderItems.map((item) => (
                    <div key={item.orderItemId}>
			<SpecificItem ID={item.specificItemId} />
                        <div>Price: {item.price}</div>
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        return <div>{(error as Error).message}</div>;
    }
}


