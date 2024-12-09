-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `addresses` (
	`address_id` int AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`street_address` varchar(255),
	`city` varchar(50),
	`post_code` varchar(20),
	`country` varchar(50),
	`name` varchar(30),
	CONSTRAINT `addresses_address_id` PRIMARY KEY(`address_id`)
);
--> statement-breakpoint
CREATE TABLE `colour` (
	`colour_id` int AUTO_INCREMENT NOT NULL,
	`colour` varchar(100) NOT NULL,
	CONSTRAINT `colour_colour_id` PRIMARY KEY(`colour_id`)
);
--> statement-breakpoint
CREATE TABLE `images` (
	`image_id` int AUTO_INCREMENT NOT NULL,
	`url` text NOT NULL,
	`width` int NOT NULL,
	`height` int NOT NULL,
	CONSTRAINT `images_image_id` PRIMARY KEY(`image_id`)
);
--> statement-breakpoint
CREATE TABLE `kids_size` (
	`size` varchar(100) NOT NULL,
	`size_id` int AUTO_INCREMENT NOT NULL,
	CONSTRAINT `kids_size_size_id` PRIMARY KEY(`size_id`)
);
--> statement-breakpoint
CREATE TABLE `mens_size` (
	`size` varchar(100) NOT NULL,
	`size_id` int AUTO_INCREMENT NOT NULL,
	CONSTRAINT `mens_size_size_id` PRIMARY KEY(`size_id`)
);
--> statement-breakpoint
CREATE TABLE `order_items` (
	`order_item_id` int AUTO_INCREMENT NOT NULL,
	`order_id` int,
	`price` decimal(10,2),
	`product_id` int,
	CONSTRAINT `order_items_order_item_id` PRIMARY KEY(`order_item_id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`order_id` int AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`order_date` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	`total_amount` decimal(10,2) NOT NULL,
	`varchar` varchar(29) NOT NULL DEFAULT 'Your order has been received.',
	`address_id` int NOT NULL,
	CONSTRAINT `orders_order_id` PRIMARY KEY(`order_id`)
);
--> statement-breakpoint
CREATE TABLE `product_catalouge` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`image_location` varchar(100) NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`category` varchar(100) NOT NULL,
	CONSTRAINT `product_catalouge_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_images` (
	`product_id` int,
	`image_id` int
);
--> statement-breakpoint
CREATE TABLE `ribbon` (
	`ribbon_id` int AUTO_INCREMENT NOT NULL,
	`ribbon` varchar(100) NOT NULL,
	CONSTRAINT `ribbon_ribbon_id` PRIMARY KEY(`ribbon_id`)
);
--> statement-breakpoint
CREATE TABLE `specific_item` (
	`id` int AUTO_INCREMENT NOT NULL,
	`product_id` int,
	`size` varchar(100),
	`colour` int,
	`ribbon` int,
	`message` varchar(100),
	CONSTRAINT `specific_item_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` int AUTO_INCREMENT NOT NULL,
	`auth_user_id` varchar(255),
	`email` varchar(255),
	`username` varchar(255),
	CONSTRAINT `users_user_id` PRIMARY KEY(`user_id`)
);
--> statement-breakpoint
CREATE TABLE `womans_size` (
	`size` varchar(100) NOT NULL,
	`size_id` int AUTO_INCREMENT NOT NULL,
	CONSTRAINT `womans_size_size_id` PRIMARY KEY(`size_id`)
);
--> statement-breakpoint
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_user_id_users_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_order_id_orders_order_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_product_id_specific_item_id_fk` FOREIGN KEY (`product_id`) REFERENCES `specific_item`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_address_id_addresses_address_id_fk` FOREIGN KEY (`address_id`) REFERENCES `addresses`(`address_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_user_id_users_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_images` ADD CONSTRAINT `product_images_image_id_images_image_id_fk` FOREIGN KEY (`image_id`) REFERENCES `images`(`image_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_images` ADD CONSTRAINT `product_images_product_id_product_catalouge_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product_catalouge`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `specific_item` ADD CONSTRAINT `specific_item_colour_colour_colour_id_fk` FOREIGN KEY (`colour`) REFERENCES `colour`(`colour_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `specific_item` ADD CONSTRAINT `specific_item_product_id_product_catalouge_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product_catalouge`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `specific_item` ADD CONSTRAINT `specific_item_ribbon_ribbon_ribbon_id_fk` FOREIGN KEY (`ribbon`) REFERENCES `ribbon`(`ribbon_id`) ON DELETE no action ON UPDATE no action;
*/