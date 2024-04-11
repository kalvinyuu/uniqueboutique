CREATE TABLE `product_images` (
	`product_id` int,
	`image_id` int
);
--> statement-breakpoint
ALTER TABLE `product_images` ADD CONSTRAINT `product_images_product_id_product_catalouge_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product_catalouge`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_images` ADD CONSTRAINT `product_images_image_id_images_image_id_fk` FOREIGN KEY (`image_id`) REFERENCES `images`(`image_id`) ON DELETE no action ON UPDATE no action;