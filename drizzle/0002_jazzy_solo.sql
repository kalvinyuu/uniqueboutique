ALTER TABLE `product_catalouge` RENAME COLUMN "image_location" TO "image";--> statement-breakpoint
DROP TABLE `product_images`;--> statement-breakpoint
ALTER TABLE `images` ADD `name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `images` ADD `type` text NOT NULL;--> statement-breakpoint
ALTER TABLE `images` ADD `product_id` integer REFERENCES product_catalouge(id);