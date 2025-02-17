import { sqliteTable, AnySQLiteColumn, index, foreignKey, integer, text, numeric, real } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const addresses = sqliteTable("addresses", {
	addressId: integer("address_id").primaryKey({ autoIncrement: true }).notNull(),
	userId: integer("user_id").default(sql`(NULL)`).references(() => users.userId),
	streetAddress: text("street_address", { length: 255 }).default("sql`(NULL)`"),
	city: text({ length: 50 }).default("sql`(NULL)`"),
	postCode: text("post_code", { length: 20 }).default("sql`(NULL)`"),
	country: text({ length: 50 }).default("sql`(NULL)`"),
	name: text({ length: 30 }).default("sql`(NULL)`"),
},
(table) => {
	return {
		idxAddressesAddressesUserIdUsersUserIdFk: index("idx_addresses_addresses_user_id_users_user_id_fk").on(table.userId),
	}
});

export const colour = sqliteTable("colour", {
	colourId: integer("colour_id").primaryKey({ autoIncrement: true }).notNull(),
	colour: text({ length: 100 }).notNull(),
});

export const images = sqliteTable("images", {
	imageId: integer("image_id").primaryKey({ autoIncrement: true }).notNull(),
	url: text().notNull(),
	width: integer().notNull(),
	height: integer().notNull(),
});

export const kidsSize = sqliteTable("kids_size", {
	size: text({ length: 100 }).notNull(),
	id: integer("size_id").primaryKey({ autoIncrement: true }).notNull(),
});

export const mensSize = sqliteTable("mens_size", {
	size: text({ length: 100 }).notNull(),
	sizeId: integer("size_id").primaryKey({ autoIncrement: true }).notNull(),
});

export const orderItems = sqliteTable("order_items", {
	orderItemId: integer("order_item_id").primaryKey({ autoIncrement: true }).notNull(),
	orderId: integer("order_id").default(sql`(NULL)`).references(() => orders.orderId),
	price: numeric().default(sql`(NULL)`),
	productId: integer("product_id").default(sql`(NULL)`).references(() => specificItem.id),
},
(table) => {
	return {
		idxOrderItemsOrderItemsProductIdSpecificItemIdFk: index("idx_order_items_order_items_product_id_specific_item_id_fk").on(table.productId),
		idxOrderItemsOrderItemsOrderIdOrdersOrderIdFk: index("idx_order_items_order_items_order_id_orders_order_id_fk").on(table.orderId),
	}
});

export const orders = sqliteTable("orders", {
	orderId: integer("order_id").primaryKey({ autoIncrement: true }).notNull(),
	userId: integer("user_id").default(sql`(NULL)`).references(() => users.userId),
	orderDate: numeric("order_date").default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	totalAmount: numeric("total_amount").notNull(),
	orderStatus: text("order_status", { length: 29 }).default("Your order has been received.").notNull(),
	addressId: integer("address_id").notNull().references(() => addresses.addressId),
},
(table) => {
	return {
		idxOrdersOrdersAddressIdAddressesAddressIdFk: index("idx_orders_orders_address_id_addresses_address_id_fk").on(table.addressId),
		idxOrdersOrdersUserIdUsersUserIdFk: index("idx_orders_orders_user_id_users_user_id_fk").on(table.userId),
	}
});

export const productCatalouge = sqliteTable("product_catalouge", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text({ length: 100 }).notNull(),
	imageLocation: text("image_location", { length: 100 }).notNull(),
	category: text({ length: 100 }).notNull(),
	price: real().notNull(),
});

export const productImages = sqliteTable("product_images", {
	productId: integer("product_id").default(sql`(NULL)`).references(() => productCatalouge.id),
	imageId: integer("image_id").default(sql`(NULL)`).references(() => images.imageId),
},
(table) => {
	return {
		idxProductImagesProductImagesImageIdImagesImageIdFk: index("idx_product_images_product_images_image_id_images_image_id_fk").on(table.imageId),
		idxProductImagesProductImagesProductIdProductCatalougeIdFk: index("idx_product_images_product_images_product_id_product_catalouge_id_fk").on(table.productId),
	}
});

export const ribbon = sqliteTable("ribbon", {
	ribbonId: integer("ribbon_id").primaryKey({ autoIncrement: true }).notNull(),
	ribbon: text({ length: 100 }).notNull(),
});

export const specificItem = sqliteTable("specific_item", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	productId: integer("product_id").default(sql`(NULL)`).references(() => productCatalouge.id),
	size: text({ length: 100 }).default("sql`(NULL)`"),
	colour: integer().default(sql`(NULL)`).references(() => colour.colourId),
	ribbon: integer().default(sql`(NULL)`).references(() => ribbon.ribbonId),
	message: text({ length: 100 }).default("sql`(NULL)`"),
},
(table) => {
	return {
		idxSpecificItemSpecificItemRibbonRibbonRibbonIdFk: index("idx_specific_item_specific_item_ribbon_ribbon_ribbon_id_fk").on(table.ribbon),
		idxSpecificItemSpecificItemColourColourColourIdFk: index("idx_specific_item_specific_item_colour_colour_colour_id_fk").on(table.colour),
		idxSpecificItemSpecificItemProductIdProductCatalougeIdFk: index("idx_specific_item_specific_item_product_id_product_catalouge_id_fk").on(table.productId),
	}
});

export const users = sqliteTable("users", {
	userId: integer("user_id").primaryKey({ autoIncrement: true }).notNull(),
	authUserId: text("auth_user_id", { length: 255 }).default("sql`(NULL)`"),
	email: text({ length: 255 }).default("sql`(NULL)`"),
	username: text({ length: 255 }).default("sql`(NULL)`"),
});

export const womansSize = sqliteTable("womans_size", {
	size: text({ length: 100 }).notNull(),
	sizeId: integer("size_id").primaryKey({ autoIncrement: true }).notNull(),
});
