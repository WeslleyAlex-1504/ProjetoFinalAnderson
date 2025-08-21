import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1755739144209 implements MigrationInterface {
    name = 'InitialMigration1755739144209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "funcionario" ADD "ativo" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "funcionario" DROP COLUMN "ativo"`);
    }

}
