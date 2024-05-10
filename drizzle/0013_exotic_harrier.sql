ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_price_specific_item_price_fk`;
--> statement-breakpoint
ALTER TABLE `order_items` MODIFY COLUMN `price` decimal(10,2);--> statement-breakpoint
ALTER TABLE `specific_item` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `specific_item` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `addresses` ADD `name` varchar(30);--> statement-breakpoint
ALTER TABLE `specific_item` ADD `ribbon` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `specific_item` ADD CONSTRAINT `specific_item_product_id_product_catalouge_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product_catalouge`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `specific_item` DROP COLUMN `name`;--> statement-breakpoint
ALTER TABLE `specific_item` DROP COLUMN `stock`;--> statement-breakpoint
ALTER TABLE `specific_item` DROP COLUMN `category`;--> statement-breakpoint
ALTER TABLE `specific_item` DROP COLUMN `specific_id`;--> statement-breakpoint
ALTER TABLE `specific_item` DROP COLUMN `image_location`;--> statement-breakpoint
ALTER TABLE `specific_item` DROP COLUMN `image_description`;--> statement-breakpoint
ALTER TABLE `specific_item` DROP COLUMN `price`;