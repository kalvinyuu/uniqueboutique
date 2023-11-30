import { mysqlTable, mysqlSchema, AnyMySqlColumn, int, varchar, primaryKey, decimal } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const product_catalouge = mysqlTable("product_catalouge", {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    image_location: varchar("image_location", { length: 100 }).notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    category: varchar("category", { length: 100 }).notNull(),
},
					    (table) => {
						return {
						    product_catalouge_id: primaryKey(table.id)
						}
					    });

export const ribbon = mysqlTable("ribbon", {
    ribbon_id: int("ribbon_id").autoincrement().primaryKey().notNull(),
    ribbon: varchar("ribbon", { length: 100 }).notNull(),
});

export const mens_size = mysqlTable("mens_size", {
    size: varchar("size", { length: 100 }).notNull(),
    size_id: int("size_id").autoincrement().primaryKey().notNull(),});

export const womans_size = mysqlTable("womans_size", {
    size: varchar("size", { length: 100 }).notNull(),
    size_id: int("size_id").autoincrement().primaryKey().notNull(),
});


export const colour = mysqlTable("colour", {
    id: int("colour_id").autoincrement().notNull().primaryKey(),
    colour: varchar("colour", { length: 100 }).notNull(),
});
export const kids_size = mysqlTable("kids_size", {
    size: varchar("size", { length: 100 }).notNull(),
    size_id: int("size_id").autoincrement().primaryKey().notNull(),
});

export const specific_item = mysqlTable("specific_item", {
    id: int('id').primaryKey(),
    product_id: int("product id"),
    size: varchar("size", { length: 100 }),
    colour: varchar("colour", { length: 100 }),
    name: varchar("name", { length: 100 }),
    stock: int("stock"),
    category: varchar("category", { length: 100 }),
    specific_id: varchar("specific_id", { length: 100 }),
    image_location: varchar("image_location", { length: 100 }),
    image_description: varchar("image_description", { length: 100 }),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    message: varchar("message", { length: 100 }),

});
