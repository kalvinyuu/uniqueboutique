ALTER TABLE `specific_item` MODIFY COLUMN `colour` int;--> statement-breakpoint
ALTER TABLE `specific_item` MODIFY COLUMN `ribbon` int;--> statement-breakpoint
ALTER TABLE `specific_item` ADD CONSTRAINT `specific_item_colour_colour_colour_id_fk` FOREIGN KEY (`colour`) REFERENCES `colour`(`colour_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `specific_item` ADD CONSTRAINT `specific_item_ribbon_ribbon_ribbon_id_fk` FOREIGN KEY (`ribbon`) REFERENCES `ribbon`(`ribbon_id`) ON DELETE no action ON UPDATE no action;