import { mysqlTable, mysqlSchema, AnyMySqlColumn, int, varchar, decimal } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const productCatalouge = mysqlTable("productCatalouge", {
	id: int("id").autoincrement().primaryKey().notNull(),
	name: varchar("name", { length: 100 }),
	imageLocation: varchar("imageLocation", { length: 100 }),
	price: decimal("price", { precision: 10, scale: 2 }),
});