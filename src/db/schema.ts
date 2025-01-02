import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const productCatalouge = sqliteTable("product_catalouge", {
    id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
    name: text("name").notNull(),
    imageLocation: text("image_location").notNull(),
    price: real("price").notNull(),
    category: text("category").notNull(),
});

export const specificItem = sqliteTable("specific_item", {
    id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
    productId: integer("product_id").references(() => productCatalouge.id).notNull(),
    size: text("size").notNull(),
    colour: integer("colour").references(() => colour.id).notNull(),
    ribbon: integer("ribbon").references(() => ribbon.id),
    message: text("message"),
});

export const productImages = sqliteTable("product_images", {
    productId: integer("product_id").references(() => productCatalouge.id),
    imageId: integer("image_id").references(() => images.id),
});

export const images = sqliteTable("images", {
    id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
    url: text("url").notNull(),
    width: integer("width").notNull(),
    height: integer("height").notNull(),
});

export const colour = sqliteTable("colour", {
    id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
    colour: text("colour").notNull(),
});

export const ribbon = sqliteTable("ribbon", {
    id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
    ribbon: text("ribbon").notNull(),
});

export const kidsSize = sqliteTable("kids_size", {
    size: text("size").notNull(),
    sizeId: integer("size_id").primaryKey({ autoIncrement: true }).notNull(),
});

export const mensSize = sqliteTable("mens_size", {
    size: text("size").notNull(),
    id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
});

export conspt womansSize = sqliteTable("womans_size", {
    size: text("size").notNull(),
    id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
});

export const orderItems = sqliteTable("order_items", {
    id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
    orderId: integer("order_id").references(() => orders.id).notNull(),
    specificItemId: integer("product_id").references(() => specificItem.id).notNull(),
    price: real("price").notNull(), 
});

export const orders = sqliteTable("orders", {
    id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
    userId: integer("user_id").references(() => users.id),
    addressId: integer("address_id").references(() => addresses.id).notNull(),
    orderDate: text("order_date").default(sql`CURRENT_TIMESTAMP`).notNull(), 
    totalAmount: real("total_amount").notNull(), 
    orderStatus: text("order_status")
        .default("Your order has been received.")
        .notNull()
});

export const users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
    authId: text("auth_user_id").notNull(),
    email: text("email"),
    authName: text("username"),
});

export const addresses = sqliteTable("addresses", {
    id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
    userId: integer("user_id").references(() => users.id),
    name: text("name").notNull(),
    streetAddress: text("street_address").notNull(),
    city: text("city").notNull(),
    postCode: text("post_code").notNull(),
    country: text("country").notNull(),
});
