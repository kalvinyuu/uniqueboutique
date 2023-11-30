export type Product = {
    id: number,
    name: string,
    image_location: string,
    price: string,
    category: string
}

export type Size = {
    size_id: number,
    size: string
}[]

export type Colour = {
    id: number,
    colour: string
}[]

export type Ribbon = {
    ribbon_id: number,
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

export type Action =
    | { type: 'ADD_TO_CART';
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
	ribbon_id: number | null; }
    | { type: 'REMOVE_FROM_CART'; id: number };

