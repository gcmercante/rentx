import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserSetAvataUrl1656152057850 implements MigrationInterface {
    name = 'UpdateUserSetAvataUrl1656152057850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar_url" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar_url"`);
    }

}
