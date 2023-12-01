import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, int, varchar, decimal, timestamp } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const addresses = mysqlTable("addresses", {
	addressId: int("address_id").autoincrement().notNull(),
	userId: int("user_id"),
	streetAddress: varchar("street_address", { length: 255 }),
	city: varchar("city", { length: 50 }),
	state: varchar("state", { length: 50 }),
	postalCode: varchar("postal_code", { length: 20 }),
	country: varchar("country", { length: 50 }),
},
(table) => {
	return {
		addressesAddressId: primaryKey(table.addressId),
	}
});

export const colour = mysqlTable("colour", {
	colourId: int("colour_id").autoincrement().notNull(),
	colour: varchar("colour", { length: 100 }).notNull(),
},
(table) => {
	return {
		colourColourId: primaryKey(table.colourId),
	}
});

export const kidsSize = mysqlTable("kids_size", {
	size: varchar("size", { length: 100 }).notNull(),
	sizeId: int("size_id").autoincrement().notNull(),
},
(table) => {
	return {
		kidsSizeSizeId: primaryKey(table.sizeId),
	}
});

export const mensSize = mysqlTable("mens_size", {
	size: varchar("size", { length: 100 }).notNull(),
	sizeId: int("size_id").autoincrement().notNull(),
},
(table) => {
	return {
		mensSizeSizeId: primaryKey(table.sizeId),
	}
});

export const orderItems = mysqlTable("order_items", {
	orderItemId: int("order_item_id").autoincrement().notNull(),
	orderId: int("order_id"),
	productId: int("product_id"),
	quantity: int("quantity"),
	unitPrice: decimal("unit_price", { precision: 10, scale: 2 }),
},
(table) => {
	return {
		orderItemsOrderItemId: primaryKey(table.orderItemId),
	}
});

export const orders = mysqlTable("orders", {
	orderId: int("order_id").autoincrement().notNull(),
	userId: int("user_id"),
	orderDate: timestamp("order_date", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	totalAmount: decimal("total_amount", { precision: 10, scale: 2 }),
},
(table) => {
	return {
		ordersOrderId: primaryKey(table.orderId),
	}
});

export const productCatalouge = mysqlTable("product_catalouge", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 100 }).notNull(),
	imageLocation: varchar("image_location", { length: 100 }).notNull(),
	price: decimal("price", { precision: 10, scale: 2 }).notNull(),
	category: varchar("category", { length: 100 }).notNull(),
},
(table) => {
	return {
		productCatalougeId: primaryKey(table.id),
	}
});

export const ribbon = mysqlTable("ribbon", {
	ribbonId: int("ribbon_id").autoincrement().notNull(),
	ribbon: varchar("ribbon", { length: 100 }).notNull(),
},
(table) => {
	return {
		ribbonRibbonId: primaryKey(table.ribbonId),
	}
});

export const specificItem = mysqlTable("specific_item", {
	id: int("id").notNull(),
	productId: int("product_id"),
	size: varchar("size", { length: 100 }),
	colour: varchar("colour", { length: 100 }),
	name: varchar("name", { length: 100 }),
	stock: int("stock"),
	category: varchar("category", { length: 100 }),
	specificId: varchar("specific_id", { length: 100 }),
	imageLocation: varchar("image_location", { length: 100 }),
	imageDescription: varchar("image_description", { length: 100 }),
	price: decimal("price", { precision: 10, scale: 2 }).notNull(),
	message: varchar("message", { length: 100 }),
},
(table) => {
	return {
		specificItemId: primaryKey(table.id),
	}
});

export const users = mysqlTable("users", {
	userId: int("user_id").autoincrement().notNull(),
	auth0UserId: varchar("auth0_user_id", { length: 255 }).notNull(),
	username: varchar("username", { length: 50 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	registrationDate: timestamp("registration_date", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
},
(table) => {
	return {
		usersUserId: primaryKey(table.userId),
	}
});

export const womansSize = mysqlTable("womans_size", {
	size: varchar("size", { length: 100 }).notNull(),
	sizeId: int("size_id").autoincrement().notNull(),
},
(table) => {
	return {
		womansSizeSizeId: primaryKey(table.sizeId),
	}
});
