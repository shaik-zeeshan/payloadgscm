import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_hero_text_alignment" AS ENUM('left', 'center', 'right');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_pages_blocks_hero_vertical_alignment" AS ENUM('top', 'center', 'bottom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_socal_links_platform" AS ENUM('twitter', 'facebook', 'instagram', 'linkedin', 'telephone', 'email', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"thumbnail_u_r_l" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric
);

CREATE TABLE IF NOT EXISTS "pages_blocks_hero" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"textAlignment" "enum_pages_blocks_hero_text_alignment",
	"verticalAlignment" "enum_pages_blocks_hero_vertical_alignment",
	"title" varchar,
	"description" varchar,
	"button_text" varchar,
	"button_link" varchar,
	"image_id" integer,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_about_employee" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"position" varchar NOT NULL,
	"image_id" integer NOT NULL
);

CREATE TABLE IF NOT EXISTS "pages_blocks_about" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"content" jsonb,
	"image_id" integer,
	"about_me_content" varchar,
	"content_h_t_m_l" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_service_services" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"service" varchar NOT NULL,
	"description" varchar NOT NULL,
	"image_id" integer
);

CREATE TABLE IF NOT EXISTS "pages_blocks_service" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_header_sections" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar,
	"href" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_header" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"logo" varchar,
	"cta_text" varchar,
	"cta_href" varchar,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages_blocks_benefit_benefits" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "pages_blocks_benefit" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"block_name" varchar
);

CREATE TABLE IF NOT EXISTS "pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"view_count" numeric,
	"slug" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "socal_links" (
	"id" serial PRIMARY KEY NOT NULL,
	"platform" "enum_socal_links_platform",
	"title" varchar NOT NULL,
	"value" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" ("filename");
CREATE INDEX IF NOT EXISTS "pages_blocks_hero_order_idx" ON "pages_blocks_hero" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_hero_path_idx" ON "pages_blocks_hero" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_about_employee_order_idx" ON "pages_blocks_about_employee" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_about_employee_parent_id_idx" ON "pages_blocks_about_employee" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_about_order_idx" ON "pages_blocks_about" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_about_parent_id_idx" ON "pages_blocks_about" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_about_path_idx" ON "pages_blocks_about" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_service_services_order_idx" ON "pages_blocks_service_services" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_service_services_parent_id_idx" ON "pages_blocks_service_services" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_service_order_idx" ON "pages_blocks_service" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_service_parent_id_idx" ON "pages_blocks_service" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_service_path_idx" ON "pages_blocks_service" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_header_sections_order_idx" ON "pages_blocks_header_sections" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_header_sections_parent_id_idx" ON "pages_blocks_header_sections" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_header_order_idx" ON "pages_blocks_header" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_header_parent_id_idx" ON "pages_blocks_header" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_header_path_idx" ON "pages_blocks_header" ("_path");
CREATE INDEX IF NOT EXISTS "pages_blocks_benefit_benefits_order_idx" ON "pages_blocks_benefit_benefits" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_benefit_benefits_parent_id_idx" ON "pages_blocks_benefit_benefits" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_benefit_order_idx" ON "pages_blocks_benefit" ("_order");
CREATE INDEX IF NOT EXISTS "pages_blocks_benefit_parent_id_idx" ON "pages_blocks_benefit" ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_blocks_benefit_path_idx" ON "pages_blocks_benefit" ("_path");
CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" ("created_at");
CREATE INDEX IF NOT EXISTS "socal_links_created_at_idx" ON "socal_links" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" ("created_at");
DO $$ BEGIN
 ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_about_employee" ADD CONSTRAINT "pages_blocks_about_employee_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_about_employee" ADD CONSTRAINT "pages_blocks_about_employee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_service_services" ADD CONSTRAINT "pages_blocks_service_services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_service_services" ADD CONSTRAINT "pages_blocks_service_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_service"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_service" ADD CONSTRAINT "pages_blocks_service_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_header_sections" ADD CONSTRAINT "pages_blocks_header_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_header"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_header" ADD CONSTRAINT "pages_blocks_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_benefit_benefits" ADD CONSTRAINT "pages_blocks_benefit_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages_blocks_benefit"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_blocks_benefit" ADD CONSTRAINT "pages_blocks_benefit_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`)
};

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 DROP TABLE "users";
DROP TABLE "media";
DROP TABLE "pages_blocks_hero";
DROP TABLE "pages_blocks_about_employee";
DROP TABLE "pages_blocks_about";
DROP TABLE "pages_blocks_service_services";
DROP TABLE "pages_blocks_service";
DROP TABLE "pages_blocks_header_sections";
DROP TABLE "pages_blocks_header";
DROP TABLE "pages_blocks_benefit_benefits";
DROP TABLE "pages_blocks_benefit";
DROP TABLE "pages";
DROP TABLE "socal_links";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";`)
};
