CREATE TABLE `images` (
	`image_id` int AUTO_INCREMENT NOT NULL,
	`url` text NOT NULL,
	`width` int NOT NULL,
	`height` int NOT NULL,
	CONSTRAINT `images_image_id` PRIMARY KEY(`image_id`)
);
