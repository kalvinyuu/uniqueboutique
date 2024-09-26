export type Product = {
    id: number,
    name: string,
    imageLocation: string,
    price: string,
    category: string
}

export type Images = {
    imageId: number,
    url: string,
    width: number,
    height: number
}

export type Size = {
    sizeId: number,
    size: string
}[]

export type Colour = {
    colourId: number,
    colour: string
}[]

export type Ribbon = {
    ribbonId: number,
    ribbon: string
}[]

export type CartItem = {
    id: number;
    name: string;
    image_location: string;
    price: string;
    category: string;
    size: string;
    size_id: number;
    colour: string;
    colour_id: number;
    ribbon: string | null ;
    ribbon_id: number | null;
}

export type Cart = CartItem[];

export type ProductCatalouge = {
  id: number;
  name: string;
  imageLocation: string;
  price: string
  category: string;
}

export type Item = {
    id: string,
    name: string,
    image: string,
    quantity: number,
    price: number
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
    totalAmount: string; 
    orderStatus: "Your order has been received." | "Your order has been shipped.";
}

export enum OrderStat {
    Recieved = "Your order has been received.",
    Shipped = 'Your order has been shipped.'
}

export type OrderItems = {
    orderItemId: number;
    orderId: number;
    specificItemId: number;
    price: string;
}[]

export type Addresses = {
    addressId: number;
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
    size?: string;
    colour?: number;
    ribbon?: number | null;
    message?: string | null;
}
