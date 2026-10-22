ALTER TABLE "posts" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "id" SET DATA TYPE uuid USING gen_random_uuid();--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
DROP SEQUENCE IF EXISTS "posts_id_seq";
