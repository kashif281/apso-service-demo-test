import { MigrationInterface, QueryRunner } from "typeorm";

export class GeneratedMigration1762297089200 implements MigrationInterface {
    name = 'GeneratedMigration1762297089200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."test-customer_status_enum" AS ENUM('Active', 'Archived', 'Delete')`);
        await queryRunner.query(`CREATE TABLE "test-customer" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "country" text NOT NULL, "streetAddress1" text NOT NULL, "streetAddress2" text NOT NULL, "city" text NOT NULL, "state" text NOT NULL, "zipCode" text NOT NULL, "phoneNumber" text, "createdBy" text, "status" "public"."test-customer_status_enum" NOT NULL DEFAULT 'Active', CONSTRAINT "PK_a22cff6f86fb957823c8c121705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."test-facility_status_enum" AS ENUM('Active', 'Archived', 'Delete')`);
        await queryRunner.query(`CREATE TABLE "test-facility" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "contactName" text, "streetAddress1" text NOT NULL, "streetAddress2" text NOT NULL, "city" text NOT NULL, "state" text NOT NULL, "country" text NOT NULL, "zipCode" text NOT NULL, "status" "public"."test-facility_status_enum" NOT NULL DEFAULT 'Active', "weight" text NOT NULL, "customerId" integer, CONSTRAINT "PK_6873adb5994ed222f1e21134b5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(255) NOT NULL, "description" text, "status" character varying(255) NOT NULL DEFAULT 'active', "start_date" date, "end_date" date, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_dedfea394088ed136ddadeee89" ON "project" ("name") `);
        await queryRunner.query(`CREATE TABLE "task" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(255) NOT NULL, "description" text, "status" character varying(255) NOT NULL DEFAULT 'pending', "priority" character varying(255) NOT NULL DEFAULT 'medium', "due_date" date, "project_id" uuid NOT NULL, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1f53e7ffe94530f9e0221224d2" ON "task" ("project_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3399e2710196ea4bf734751558" ON "task" ("title") `);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "content" text NOT NULL, "task_id" uuid NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bbfe153fa60aa06483ed35ff4a" ON "comment" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_91256732111f039be6b212d96c" ON "comment" ("task_id") `);
        await queryRunner.query(`CREATE TABLE "assignment" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid NOT NULL, "task_id" uuid NOT NULL, "assigned_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_43c2f5a3859f54cedafb270f37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3b97cc18d3091b93b2f3d232a7" ON "assignment" ("user_id", "task_id") `);
        await queryRunner.query(`ALTER TABLE "test-facility" ADD CONSTRAINT "FK_019deaff3c8726ce53cf857aebf" FOREIGN KEY ("customerId") REFERENCES "test-customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "test-facility" DROP CONSTRAINT "FK_019deaff3c8726ce53cf857aebf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3b97cc18d3091b93b2f3d232a7"`);
        await queryRunner.query(`DROP TABLE "assignment"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_91256732111f039be6b212d96c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bbfe153fa60aa06483ed35ff4a"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3399e2710196ea4bf734751558"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1f53e7ffe94530f9e0221224d2"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dedfea394088ed136ddadeee89"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "test-facility"`);
        await queryRunner.query(`DROP TYPE "public"."test-facility_status_enum"`);
        await queryRunner.query(`DROP TABLE "test-customer"`);
        await queryRunner.query(`DROP TYPE "public"."test-customer_status_enum"`);
    }

}
