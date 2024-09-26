ALTER TABLE `addresses` MODIFY COLUMN `name` varchar(30) NOT NULL;--> statement-breakpoint
ALTER TABLE `addresses` MODIFY COLUMN `street_address` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `addresses` MODIFY COLUMN `city` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `addresses` MODIFY COLUMN `post_code` varchar(20) NOT NULL;--> statement-breakpoint
ALTER TABLE `addresses` MODIFY COLUMN `country` varchar(50) NOT NULL;