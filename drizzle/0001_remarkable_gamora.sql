ALTER TABLE "checks_table" ALTER COLUMN "last_pinged" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "monitors_table" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "monitors_table" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "monitors_table" ALTER COLUMN "updated_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "monitors_table" ALTER COLUMN "updated_at" SET DEFAULT now();