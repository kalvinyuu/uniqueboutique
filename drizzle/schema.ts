import { mysqlTable, mysqlSchema, AnyMySqlColumn, int, varchar, decimal, timestamp } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const addresses = mysqlTable("addresses", {
	addressId: int("address_id").notNull(),
	userId: int("user_id").notNull(),
	streetAddress: varchar("street_address", { length: 255 }),
	city: varchar("city", { length: 50 }),
	postCode: varchar("post_code", { length: 20 }),
	country: varchar("country", { length: 50 }),
});

export const colour = mysqlTable("colour", {
	colourId: int("colour_id").notNull(),
	colour: varchar("colour", { length: 100 }),
});

export const kidsSize = mysqlTable("kids_size", {
	size: varchar("size", { length: 100 }),
	sizeId: int("size_id").notNull(),
});

export const mensSize = mysqlTable("mens_size", {
	size: varchar("size", { length: 100 }),
	sizeId: int("size_id").notNull(),
});

export const orderItems = mysqlTable("order_items", {
	orderItemId: int("order_item_id").notNull(),
	orderId: int("order_id"),
	productId: int("product_id"),
	quantity: int("quantity"),
	unitPrice: decimal("unit_price", { precision: 10, scale: 2 }),
});

export const orders = mysqlTable("orders", {
	orderId: int("order_id").notNull(),
	userId: int("user_id"),
	orderDate: timestamp("order_date", { mode: 'string' }),
	totalAmount: decimal("total_amount", { precision: 10, scale: 2 }),
});

export const productCatalouge = mysqlTable("product_catalouge", {
	id: int("id").notNull(),
	name: varchar("name", { length: 100 }).notNull(),
	imageLocation: varchar("image_location", { length: 100 }),
	price: decimal("price", { precision: 10, scale: 2 }).notNull(),
	category: varchar("category", { length: 100 }).notNull(),
});

export const ribbon = mysqlTable("ribbon", {
	ribbonId: int("ribbon_id").notNull(),
	ribbon: varchar("ribbon", { length: 100 }),
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
	price: decimal("price", { precision: 10, scale: 2 }),
	message: varchar("message", { length: 100 }),
});

export const users = mysqlTable("users", {
	userId: int("user_id").notNull(),
	auth0UserId: varchar("auth0_user_id", { length: 255 }),
	firstname: varchar("firstname", { length: 50 }),
	email: varchar("email", { length: 255 }),
	registrationDate: timestamp("registration_date", { mode: 'string' }),
	surname: varchar("surname", { length: 50 }),
});

export const womansSize = mysqlTable("womans_size", {
	size: varchar("size", { length: 100 }),
	sizeId: int("size_id").notNull(),
});