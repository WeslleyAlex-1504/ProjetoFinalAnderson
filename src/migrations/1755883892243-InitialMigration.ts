import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1755883892243 implements MigrationInterface {
    name = 'InitialMigration1755883892243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ADD "imagem" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funcionario" ADD "imagem" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "funcionario" DROP COLUMN "imagem"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "imagem"`);
    }

}
