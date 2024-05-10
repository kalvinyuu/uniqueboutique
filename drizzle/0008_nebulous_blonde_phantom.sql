ALTER TABLE `order_items` RENAME COLUMN `unit_price` TO `price`;--> statement-breakpoint
ALTER TABLE `addresses` MODIFY COLUMN `user_id` int;--> statement-breakpoint
ALTER TABLE `order_items` MODIFY COLUMN `price` decimal;--> statement-breakpoint
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_user_id_users_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_order_id_orders_order_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_product_id_specific_item_id_fk` FOREIGN KEY (`product_id`) REFERENCES `specific_item`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_price_specific_item_price_fk` FOREIGN KEY (`price`) REFERENCES `specific_item`(`price`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_user_id_users_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `firstname`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `surname`;