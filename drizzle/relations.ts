import { relations } from "drizzle-orm/relations";
import { users, addresses, specificItem, orderItems, orders, productCatalouge, productImages, images, ribbon, colour } from "./schema";

export const addressesRelations = relations(addresses, ({one, many}) => ({
	user: one(users, {
		fields: [addresses.userId],
		references: [users.userId]
	}),
	orders: many(orders),
}));

export const usersRelations = relations(users, ({many}) => ({
	addresses: many(addresses),
	orders: many(orders),
}));

export const orderItemsRelations = relations(orderItems, ({one}) => ({
	specificItem: one(specificItem, {
		fields: [orderItems.productId],
		references: [specificItem.id]
	}),
	order: one(orders, {
		fields: [orderItems.orderId],
		references: [orders.orderId]
	}),
}));

export const specificItemRelations = relations(specificItem, ({one, many}) => ({
	orderItems: many(orderItems),
	ribbon: one(ribbon, {
		fields: [specificItem.ribbon],
		references: [ribbon.ribbonId]
	}),
	productCatalouge: one(productCatalouge, {
		fields: [specificItem.productId],
		references: [productCatalouge.id]
	}),
	colour: one(colour, {
		fields: [specificItem.colour],
		references: [colour.colourId]
	}),
}));

export const ordersRelations = relations(orders, ({one, many}) => ({
	orderItems: many(orderItems),
	user: one(users, {
		fields: [orders.userId],
		references: [users.userId]
	}),
	address: one(addresses, {
		fields: [orders.addressId],
		references: [addresses.addressId]
	}),
}));

export const productImagesRelations = relations(productImages, ({one}) => ({
	productCatalouge: one(productCatalouge, {
		fields: [productImages.productId],
		references: [productCatalouge.id]
	}),
	image: one(images, {
		fields: [productImages.imageId],
		references: [images.imageId]
	}),
}));

export const productCatalougeRelations = relations(productCatalouge, ({many}) => ({
	productImages: many(productImages),
	specificItems: many(specificItem),
}));

export const imagesRelations = relations(images, ({many}) => ({
	productImages: many(productImages),
}));

export const ribbonRelations = relations(ribbon, ({many}) => ({
	specificItems: many(specificItem),
}));

export const colourRelations = relations(colour, ({many}) => ({
	specificItems: many(specificItem),
}));