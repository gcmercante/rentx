import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserRemoveUsername1656147481322
  implements MigrationInterface
{
  name = 'UpdateUserRemoveUsername1656147481322';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "username" character varying NOT NULL`
    );
  }
}
