import { mysqlTable, mysqlSchema, AnyMySqlColumn, int, varchar, primaryKey, decimal } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const colour = mysqlTable("colour", {
	productId: int("product_id"),
	colour: varchar("colour", { length: 100 }),
});

export const productCatalouge = mysqlTable("product_catalouge", {
	id: int("id").autoincrement().notNull(),
	name: varchar("name", { length: 100 }),
	imageLocation: varchar("image_location", { length: 100 }),
	price: decimal("price", { precision: 10, scale: 2 }),
	category: varchar("category", { length: 100 }),
},
(table) => {
	return {
		productCatalougeId: primaryKey(table.id)
	}
});

export const size = mysqlTable("size", {
	category: varchar("category", { length: 100 }),
	size: varchar("size", { length: 100 }),
	productId: int("product_id"),
});

export const specificItem = mysqlTable("specific_item", {
	productId: int("product id"),
	size: varchar("size", { length: 100 }),
	colour: varchar("colour", { length: 100 }),
	name: varchar("name", { length: 100 }),
	stock: int("stock"),
	category: varchar("category", { length: 100 }),
	specificId: varchar("specific_id", { length: 100 }),
	imageLocation: varchar("image_location", { length: 100 }),
	imageDescription: varchar("image_description", { length: 100 }),
});