-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "clientes" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(50) NOT NULL,
	"limite" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transacoes" (
	"id" serial PRIMARY KEY NOT NULL,
	"cliente_id" integer NOT NULL,
	"valor" integer NOT NULL,
	"tipo" char(1) NOT NULL,
	"descricao" varchar(10) NOT NULL,
	"realizada_em" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "saldos" (
	"id" serial PRIMARY KEY NOT NULL,
	"cliente_id" integer NOT NULL,
	"valor" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transacoes" ADD CONSTRAINT "fk_clientes_transacoes_id" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "saldos" ADD CONSTRAINT "fk_clientes_saldos_id" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/