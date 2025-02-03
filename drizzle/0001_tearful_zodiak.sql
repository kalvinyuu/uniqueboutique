ALTER TABLE `colour` RENAME COLUMN "colour_id" TO "id";--> statement-breakpoint
ALTER TABLE `images` RENAME COLUMN "image_id" TO "id";--> statement-breakpoint
ALTER TABLE `mens_size` RENAME COLUMN "size_id" TO "id";--> statement-breakpoint
ALTER TABLE `ribbon` RENAME COLUMN "ribbon_id" TO "id";--> statement-breakpoint
ALTER TABLE `users` RENAME COLUMN "user_id" TO "id";--> statement-breakpoint
ALTER TABLE `womans_size` RENAME COLUMN "size_id" TO "id";--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_addresses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`name` text NOT NULL,
	`street_address` text NOT NULL,
	`city` text NOT NULL,
	`post_code` text NOT NULL,
	`country` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_addresses`("id", "user_id", "name", "street_address", "city", "post_code", "country") SELECT "id", "user_id", "name", "street_address", "city", "post_code", "country" FROM `addresses`;--> statement-breakpoint
DROP TABLE `addresses`;--> statement-breakpoint
ALTER TABLE `__new_addresses` RENAME TO `addresses`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_order_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order_id` integer NOT NULL,
	`product_id` integer NOT NULL,
	`price` real NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_id`) REFERENCES `specific_item`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_order_items`("id", "order_id", "product_id", "price") SELECT "id", "order_id", "product_id", "price" FROM `order_items`;--> statement-breakpoint
DROP TABLE `order_items`;--> statement-breakpoint
ALTER TABLE `__new_order_items` RENAME TO `order_items`;--> statement-breakpoint
CREATE TABLE `__new_orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`address_id` integer NOT NULL,
	`order_date` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`total_amount` real NOT NULL,
	`order_status` text DEFAULT 'Your order has been received.' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`address_id`) REFERENCES `addresses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_orders`("id", "user_id", "address_id", "order_date", "total_amount", "order_status") SELECT "id", "user_id", "address_id", "order_date", "total_amount", "order_status" FROM `orders`;--> statement-breakpoint
DROP TABLE `orders`;--> statement-breakpoint
ALTER TABLE `__new_orders` RENAME TO `orders`;--> statement-breakpoint
CREATE TABLE `__new_product_images` (
	`product_id` integer,
	`image_id` integer,
	FOREIGN KEY (`product_id`) REFERENCES `product_catalouge`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`image_id`) REFERENCES `images`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_product_images`("product_id", "image_id") SELECT "product_id", "image_id" FROM `product_images`;--> statement-breakpoint
DROP TABLE `product_images`;--> statement-breakpoint
ALTER TABLE `__new_product_images` RENAME TO `product_images`;--> statement-breakpoint
CREATE TABLE `__new_specific_item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_id` integer NOT NULL,
	`size` text NOT NULL,
	`colour` integer NOT NULL,
	`ribbon` integer,
	`message` text,
	FOREIGN KEY (`product_id`) REFERENCES `product_catalouge`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`colour`) REFERENCES `colour`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ribbon`) REFERENCES `ribbon`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_specific_item`("id", "product_id", "size", "colour", "ribbon", "message") SELECT "id", "product_id", "size", "colour", "ribbon", "message" FROM `specific_item`;--> statement-breakpoint
DROP TABLE `specific_item`;--> statement-breakpoint
ALTER TABLE `__new_specific_item` RENAME TO `specific_item`;