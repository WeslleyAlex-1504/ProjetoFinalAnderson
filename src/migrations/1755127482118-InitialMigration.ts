import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1755127482118 implements MigrationInterface {
    name = 'InitialMigration1755127482118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "UQ_deccf50d27a5325ed5eff8000d3" UNIQUE ("telefone")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "UQ_deccf50d27a5325ed5eff8000d3"`);
    }

}
