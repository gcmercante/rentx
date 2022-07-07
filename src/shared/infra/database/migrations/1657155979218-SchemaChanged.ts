import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaChanged1657155979218 implements MigrationInterface {
  name = 'SchemaChanged1657155979218';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rentx"."category" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "rentx"."specification" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_01b2d90197e187e3187b2d888be" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "rentx"."car" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "daily_rate" integer NOT NULL, "available" boolean NOT NULL, "license_plate" character varying NOT NULL, "fine_amount" integer NOT NULL, "brand" character varying NOT NULL, "category_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "rentx"."car_image" ("id" character varying NOT NULL, "car_id" character varying NOT NULL, "image_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_76cf0a3401a80a59c62f3576bbc" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "rentx"."user" ("id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "driver_license" character varying NOT NULL, "is_admin" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "avatar_url" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "rentx"."rental" ("id" character varying NOT NULL, "car_id" character varying NOT NULL, "user_id" character varying NOT NULL, "departure_date" TIMESTAMP NOT NULL DEFAULT now(), "return_date" TIMESTAMP, "expected_return_date" TIMESTAMP NOT NULL, "total_value" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a20fc571eb61d5a30d8c16d51e8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "rentx"."specification_car" ("car_id" character varying NOT NULL, "specification_id" character varying NOT NULL, CONSTRAINT "PK_8cf10871de24f1323f1f90b10c6" PRIMARY KEY ("car_id", "specification_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_89aa707746f6fa1a7bf846f14c" ON "rentx"."specification_car" ("car_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1d3aa7c44d04b81077efa7bb3b" ON "rentx"."specification_car" ("specification_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "rentx"."car" ADD CONSTRAINT "FK_2f64ab33f185899f256d63f3483" FOREIGN KEY ("category_id") REFERENCES "rentx"."category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "rentx"."car_image" ADD CONSTRAINT "FK_2d2bb7b50ec40713d9086e07419" FOREIGN KEY ("car_id") REFERENCES "rentx"."car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "rentx"."rental" ADD CONSTRAINT "FK_825ac8ad1401d7aa2ee7910a7fc" FOREIGN KEY ("car_id") REFERENCES "rentx"."car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "rentx"."rental" ADD CONSTRAINT "FK_dabeeabbf4e4f026cfae3b3d554" FOREIGN KEY ("user_id") REFERENCES "rentx"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "rentx"."specification_car" ADD CONSTRAINT "FK_89aa707746f6fa1a7bf846f14c0" FOREIGN KEY ("car_id") REFERENCES "rentx"."car"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "rentx"."specification_car" ADD CONSTRAINT "FK_1d3aa7c44d04b81077efa7bb3b7" FOREIGN KEY ("specification_id") REFERENCES "rentx"."specification"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rentx"."specification_car" DROP CONSTRAINT "FK_1d3aa7c44d04b81077efa7bb3b7"`
    );
    await queryRunner.query(
      `ALTER TABLE "rentx"."specification_car" DROP CONSTRAINT "FK_89aa707746f6fa1a7bf846f14c0"`
    );
    await queryRunner.query(
      `ALTER TABLE "rentx"."rental" DROP CONSTRAINT "FK_dabeeabbf4e4f026cfae3b3d554"`
    );
    await queryRunner.query(
      `ALTER TABLE "rentx"."rental" DROP CONSTRAINT "FK_825ac8ad1401d7aa2ee7910a7fc"`
    );
    await queryRunner.query(
      `ALTER TABLE "rentx"."car_image" DROP CONSTRAINT "FK_2d2bb7b50ec40713d9086e07419"`
    );
    await queryRunner.query(
      `ALTER TABLE "rentx"."car" DROP CONSTRAINT "FK_2f64ab33f185899f256d63f3483"`
    );
    await queryRunner.query(
      `DROP INDEX "rentx"."IDX_1d3aa7c44d04b81077efa7bb3b"`
    );
    await queryRunner.query(
      `DROP INDEX "rentx"."IDX_89aa707746f6fa1a7bf846f14c"`
    );
    await queryRunner.query(`DROP TABLE "rentx"."specification_car"`);
    await queryRunner.query(`DROP TABLE "rentx"."rental"`);
    await queryRunner.query(`DROP TABLE "rentx"."user"`);
    await queryRunner.query(`DROP TABLE "rentx"."car_image"`);
    await queryRunner.query(`DROP TABLE "rentx"."car"`);
    await queryRunner.query(`DROP TABLE "rentx"."specification"`);
    await queryRunner.query(`DROP TABLE "rentx"."category"`);
  }
}
