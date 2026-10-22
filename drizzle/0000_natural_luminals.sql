CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"image_url" text NOT NULL,
	"caption" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
