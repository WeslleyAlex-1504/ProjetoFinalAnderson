import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1755986404650 implements MigrationInterface {
    name = 'InitialMigration1755986404650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ADD "imagem" text`);
        await queryRunner.query(`ALTER TABLE "funcionario" ADD "imagem" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "funcionario" ADD "ativo" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "funcionario" DROP COLUMN "ativo"`);
        await queryRunner.query(`ALTER TABLE "funcionario" DROP COLUMN "imagem"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "imagem"`);
    }

}
