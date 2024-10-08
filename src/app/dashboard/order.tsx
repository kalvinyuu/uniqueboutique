import { getOrders, getShippedOrders, getAddresses, getSpecItem, getOrderItems } from "@/app/utils";
import { Orders, OrderItems, Addresses, SpecificItem } from "@/app/types";
import { orderItems, specificItem } from "../../../drizzle/schema";
import  {UpdateOrderStat, UpdateShippedOrderStat }from "@/app/dashboard/updateOrderStatus"

export default function BothOrders(){
    return (
	<>
	    <ShippedOrders/>
	    <OrderViewer/>
	</>
    )
}

async function ShippedOrders() {
    const orders: Orders[] = await getShippedOrders();
    return (
        <div className="grid justify-center">
            {orders.map((order: Orders) => (
                <div key={order.id} className="justify-center products-center mx-4 my-2">
                    <div> Order ID: {order.id} </div>
                    <div> User ID: {order.userId} </div>
                    <div> Address ID: {order.addressId} </div>
                    <div> Order Date: {order.orderDate} </div>
                    <div> Total Amount: {order.totalAmount} </div>
		    <UpdateShippedOrderStat ID={order.id} />
		    <OrderItemsViewer orderID={order.id} />
		    <AddressViewer addressID={order.addressId} />
                </div>		
            ))}
        </div>
    );
}

async function OrderViewer() {
    const orders: Orders[] = await getOrders();
    return (
        <div className="grid justify-center">
            {orders.map((order: Orders) => (
                <div key={order.id} className="justify-center products-center mx-4 my-2">
                    <div> Order ID: {order.id} </div>
                    <div> User ID: {order.userId} </div>
                    <div> Address ID: {order.addressId} </div>
                    <div> Order Date: {order.orderDate} </div>
                    <div> Total Amount: {order.totalAmount} </div>
		    <UpdateOrderStat ID={order.id} />
		    <OrderItemsViewer orderID={order.id} />
		    <AddressViewer addressID={order.addressId} />
                </div>
		
            ))}
        </div>
    );
}

export async function SpecificItem({ ID }: { ID: number }) {
    try {
        const item: SpecificItem = await getSpecItem(ID);
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
        const address: Addresses = await getAddresses(addressID);

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
        const orderItems: OrderItems = await getOrderItems(orderID);
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



