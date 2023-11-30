CREATE TABLE `kids_size` (
	`kids_size` varchar(100) NOT NULL,
	`size_id` int AUTO_INCREMENT NOT NULL,
	CONSTRAINT `kids_size_size_id` PRIMARY KEY(`size_id`)
);
--> statement-breakpoint
CREATE TABLE `mens_size` (
	`mens_size` varchar(100) NOT NULL,
	`size_id` int AUTO_INCREMENT NOT NULL,
	CONSTRAINT `mens_size_size_id` PRIMARY KEY(`size_id`)
);
--> statement-breakpoint
CREATE TABLE `ribbon` (
	`ribbon_id` int AUTO_INCREMENT NOT NULL,
	`ribbon` varchar(100) NOT NULL,
	CONSTRAINT `ribbon_ribbon_id` PRIMARY KEY(`ribbon_id`)
);
--> statement-breakpoint
CREATE TABLE `womans_size` (
	`womans_size` varchar(100) NOT NULL,
	`size_id` int AUTO_INCREMENT NOT NULL,
	CONSTRAINT `womans_size_size_id` PRIMARY KEY(`size_id`)
);
--> statement-breakpoint
DROP TABLE `size`;--> statement-breakpoint
ALTER TABLE `colour` MODIFY COLUMN `colour` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `product_catalouge` MODIFY COLUMN `name` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `product_catalouge` MODIFY COLUMN `image_location` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `product_catalouge` MODIFY COLUMN `price` decimal(10,2) NOT NULL;--> statement-breakpoint
ALTER TABLE `product_catalouge` MODIFY COLUMN `category` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `colour` ADD `colour_id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `specific_item` ADD `price` decimal(10,2) NOT NULL;--> statement-breakpoint
ALTER TABLE `specific_item` ADD `message` varchar(100);--> statement-breakpoint
ALTER TABLE `colour` DROP COLUMN `product_id`;--> statement-breakpoint
ALTER TABLE `colour` ADD PRIMARY KEY(`colour_id`);