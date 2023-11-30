CREATE TABLE `colour` (
	`product_id` int,
	`colour` varchar(100)
);
--> statement-breakpoint
CREATE TABLE `product_catalouge` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100),
	`imageLocation` varchar(100),
	`price` decimal(10,2),
	`category` varchar(100),
	CONSTRAINT `product_catalouge_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `size` (
	`category` varchar(100),
	`size` varchar(100),
	`product_id` int
);
--> statement-breakpoint
CREATE TABLE `specific item` (
	`product id` int,
	`size` varchar(100),
	`colour` varchar(100),
	`name` varchar(100),
	`stock` int,
	`category` varchar(100),
	`specific_id` varchar(100),
	`image_location` varchar(100),
	`image_description` varchar(100)
);
--> statement-breakpoint
DROP TABLE `productCatalouge`;