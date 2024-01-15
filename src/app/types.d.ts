export type Product = {
    id: number,
    name: string,
    imageLocation: string,
    price: string,
    category: string
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
