CREATE TABLE "checks_table" (
	"id" uuid PRIMARY KEY NOT NULL,
	"monitor_id" uuid,
	"status_code" text NOT NULL,
	"status_text" text NOT NULL,
	"response_time_ms" integer NOT NULL,
	"ttfb" integer NOT NULL,
	"content_type" varchar NOT NULL,
	"content_length" varchar NOT NULL,
	"server_name" varchar NOT NULL,
	"server_ip" "inet" NOT NULL,
	"error_message" text,
	"last_pinged" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "monitors_table" (
	"id" uuid PRIMARY KEY NOT NULL,
	"monitor_name" text NOT NULL,
	"monitor_url" varchar NOT NULL,
	"interval" integer NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "checks_table" ADD CONSTRAINT "checks_table_monitor_id_monitors_table_id_fk" FOREIGN KEY ("monitor_id") REFERENCES "public"."monitors_table"("id") ON DELETE no action ON UPDATE no action;