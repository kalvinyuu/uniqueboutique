import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, int, varchar, decimal, timestamp, text } from "drizzle-orm/mysql-core"
import { sql, relations } from "drizzle-orm"

export const productCatalouge = mysqlTable("product_catalouge", {
    id: int("id").autoincrement().notNull().primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    imageLocation: varchar("image_location", { length: 100 }).notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    category: varchar("category", { length: 100 }).notNull(),
});

export const specificItem = mysqlTable("specific_item", {
    id: int("id").primaryKey().notNull().autoincrement(),
    productId: int("product_id").references(()=>productCatalouge.id),
    size: varchar("size", { length: 100 }),
    colour: int("colour").references(()=>colour.colourId),
    ribbon: int("ribbon").references(()=>ribbon.ribbonId),
    message: varchar("message", { length: 100 }),
});

export const product_images = mysqlTable("product_images", {
    productId: int("product_id").references(()=> productCatalouge.id),
    imageId: int("image_id").references(() => images.imageId)
});

export const images = mysqlTable("images", {
    imageId: int("image_id").autoincrement().notNull().primaryKey(),
    url: text("url").notNull(),
    width: int("width").notNull(),
    height: int("height").notNull(),
});

export const colour = mysqlTable("colour", {
    colourId: int("colour_id").autoincrement().notNull().primaryKey(),
    colour: varchar("colour", { length: 100 }).notNull(),
});

export const ribbon = mysqlTable("ribbon", {
    ribbonId: int("ribbon_id").autoincrement().notNull().primaryKey(),
    ribbon: varchar("ribbon", { length: 100 }).notNull(),
});

export const kidsSize = mysqlTable("kids_size", {
    size: varchar("size", { length: 100 }).notNull(),
    sizeId: int("size_id").autoincrement().notNull().primaryKey(),
});

export const mensSize = mysqlTable("mens_size", {
    size: varchar("size", { length: 100 }).notNull(),
    sizeId: int("size_id").autoincrement().notNull().primaryKey(),
});

export const womansSize = mysqlTable("womans_size", {
    size: varchar("size", { length: 100 }).notNull(),
    sizeId: int("size_id").autoincrement().notNull().primaryKey(),
});

export const orderItems = mysqlTable("order_items", {
    orderItemId: int("order_item_id").autoincrement().notNull().primaryKey(),
    orderId: int("order_id").references(()=>orders.id).notNull(),
    specificItemId: int("product_id").references(()=>specificItem.id).notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull()
});

export const orders = mysqlTable("orders", {
    id: int("order_id").autoincrement().notNull().primaryKey(),
    userId: int("user_id").references(()=>users.id),
    addressId: int("address_id").references(()=>addresses.addressId).notNull(),
    orderDate: timestamp("order_date", { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
    orderStatus: varchar('varchar', { length: 29, enum: ["Your order has been received.", 'Your order has been shipped.'] })
	.notNull().default("Your order has been received."),
});

export const users = mysqlTable("users", {
    id: int("user_id").autoincrement().notNull().primaryKey(),
    authId: varchar("auth_user_id", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }),
    authName:varchar("username", {length: 255}),
});

export const addresses = mysqlTable("addresses", {
    addressId: int("address_id").autoincrement().notNull().primaryKey(),
    userId: int("user_id").references(()=>users.id),
    name: varchar("name", {length: 30}).notNull(),
    streetAddress: varchar("street_address", { length: 255 }).notNull(),
    city: varchar("city", { length: 50 }).notNull(),
    postCode: varchar("post_code", { length: 20 }).notNull(),
    country: varchar("country", { length: 50 }).notNull(),
});
