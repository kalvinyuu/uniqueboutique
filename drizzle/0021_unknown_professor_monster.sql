ALTER TABLE `order_items` MODIFY COLUMN `order_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `order_items` MODIFY COLUMN `product_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `order_items` MODIFY COLUMN `price` decimal(10,2) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `auth_user_id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `username` varchar(255) NOT NULL;