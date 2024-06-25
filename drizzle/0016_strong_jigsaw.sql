ALTER TABLE `orders` ADD `varchar` varchar(29) DEFAULT 'Your order has been received.' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `varchar`;