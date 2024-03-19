CREATE TABLE `addresses` (
	`address_id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`street_address` varchar(255),
	`city` varchar(50),
	`post_code` varchar(20),
	`country` varchar(50),
	CONSTRAINT `addresses_address_id` PRIMARY KEY(`address_id`)
);
--> statement-breakpoint
CREATE TABLE `order_items` (
	`order_item_id` int AUTO_INCREMENT NOT NULL,
	`order_id` int,
	`product_id` int,
	`quantity` int,
	`unit_price` decimal(10,2),
	CONSTRAINT `order_items_order_item_id` PRIMARY KEY(`order_item_id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`order_id` int AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`order_date` timestamp DEFAULT CURRENT_TIMESTAMP,
	`total_amount` decimal(10,2),
	CONSTRAINT `orders_order_id` PRIMARY KEY(`order_id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` int AUTO_INCREMENT NOT NULL,
	`auth0_user_id` varchar(255) NOT NULL,
	`firstname` varchar(50) NOT NULL,
	`surname` varchar(50) NOT NULL,
	`email` varchar(255) NOT NULL,
	`registration_date` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `users_user_id` PRIMARY KEY(`user_id`)
);
--> statement-breakpoint
ALTER TABLE `kids_size` RENAME COLUMN `kids_size` TO `size`;--> statement-breakpoint
ALTER TABLE `mens_size` RENAME COLUMN `mens_size` TO `size`;--> statement-breakpoint
ALTER TABLE `specific_item` RENAME COLUMN `product id` TO `id`;--> statement-breakpoint
ALTER TABLE `womans_size` RENAME COLUMN `womans_size` TO `size`;--> statement-breakpoint
ALTER TABLE `specific_item` MODIFY COLUMN `id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `specific_item` ADD `product_id` int;