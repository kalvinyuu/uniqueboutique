ALTER TABLE `orders` MODIFY COLUMN `address_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `orders` MODIFY COLUMN `order_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `orders` MODIFY COLUMN `total_amount` decimal(10,2) NOT NULL;