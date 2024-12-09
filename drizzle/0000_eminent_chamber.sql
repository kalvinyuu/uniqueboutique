CREATE TABLE `addresses` (
	`address_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`name` text NOT NULL,
	`street_address` text NOT NULL,
	`city` text NOT NULL,
	`post_code` text NOT NULL,
	`country` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `colour` (
	`colour_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`colour` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `images` (
	`image_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`url` text NOT NULL,
	`width` integer NOT NULL,
	`height` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `kids_size` (
	`size` text NOT NULL,
	`size_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL
);
--> statement-breakpoint
CREATE TABLE `mens_size` (
	`size` text NOT NULL,
	`size_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL
);
--> statement-breakpoint
CREATE TABLE `order_items` (
	`order_item_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`order_id` integer NOT NULL,
	`product_id` integer NOT NULL,
	`price` real NOT NULL,
	FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_id`) REFERENCES `specific_item`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`order_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`address_id` integer NOT NULL,
	`order_date` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`total_amount` real NOT NULL,
	`order_status` text DEFAULT 'Your order has been received.' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`address_id`) REFERENCES `addresses`(`address_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product_catalouge` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`image_location` text NOT NULL,
	`price` real NOT NULL,
	`category` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `product_images` (
	`product_id` integer,
	`image_id` integer,
	FOREIGN KEY (`product_id`) REFERENCES `product_catalouge`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`image_id`) REFERENCES `images`(`image_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ribbon` (
	`ribbon_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ribbon` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `specific_item` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_id` integer NOT NULL,
	`size` text NOT NULL,
	`colour` integer NOT NULL,
	`ribbon` integer,
	`message` text,
	FOREIGN KEY (`product_id`) REFERENCES `product_catalouge`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`colour`) REFERENCES `colour`(`colour_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ribbon`) REFERENCES `ribbon`(`ribbon_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`auth_user_id` text NOT NULL,
	`email` text,
	`username` text
);
--> statement-breakpoint
CREATE TABLE `womans_size` (
	`size` text NOT NULL,
	`size_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL
);
