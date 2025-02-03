export type Product = {
    id: number,
    name: string,
    imageLocation: string,
    price: number,
    category: string
}

export type Images = {
    id: number,
    url: string,
    width: number,
    height: number
}

export type Size = {
    id: number,
    size: string
}[]

export type Colour = {
    id: number,
    colour: string
}[]

export type Ribbon = {
    id: number,
    ribbon: string
}[]

export type CartItem = {
    id: number,
    name: string,
    image_location: string,
    price: number,
    category: string,
    size: string,
    size_id: number,
    colour: string,
    colour_id: number,
    ribbon: string | null,
    ribbon_id: number | null,
}

export type Cart = CartItem[];

export type ProductCatalouge = {
    id: number,
    name: string,
    imageLocation: string,
    price: string,
    category: string,
}

export type Item = {
    id: string,
    name: string,
    image: string,
    quantity: number,
    price: number
}

export type User = {
    id: number,
    authId: string,
    email: string|null,
    authName: string|null
}
export type StripeProduct = {
    id: string,
    price_id: string
    name: string,
    price: number,
    currency: string,
    image: string, 
}

export type ColourTable = { id: number; colour: string }[];

export type Orders = {
    id: number;
    userId: number| null;
    addressId: number;
    orderDate: string; 
    totalAmount: number; 
    orderStatus: string;
}

const OrderStat = {
    Received:"Your order has been received.",
    Shipped: "Your order has been shipped."
} as const

export type OrderStat = typeof OrderStat[keyof typeof OrderStat]

export type OrderItems = {
    id: number;
    orderId: number;
    specificItemId: number;
    price: string;
}[]

export type Addresses = {
    id: number;
    userId: number | null;
    name: string;
    streetAddress: string;
    city: string;
    postCode: string;
    country: string;
}

export type SpecificItem = {
    id: number;
    productId: number;
    size: string;
    colour: number;
    ribbon?: number | null;
    message?: string | null;
}
