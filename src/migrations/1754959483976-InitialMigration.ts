import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1754959483976 implements MigrationInterface {
    name = 'InitialMigration1754959483976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "funcionario" DROP CONSTRAINT "FK_d2926e31b19614b06e8b481d586"`);
        await queryRunner.query(`ALTER TABLE "funcionario" RENAME COLUMN "produtoId" TO "usuarioId"`);
        await queryRunner.query(`ALTER TABLE "funcionario" ADD CONSTRAINT "FK_e996ed02bea21508cf4f60fadac" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "funcionario" DROP CONSTRAINT "FK_e996ed02bea21508cf4f60fadac"`);
        await queryRunner.query(`ALTER TABLE "funcionario" RENAME COLUMN "usuarioId" TO "produtoId"`);
        await queryRunner.query(`ALTER TABLE "funcionario" ADD CONSTRAINT "FK_d2926e31b19614b06e8b481d586" FOREIGN KEY ("produtoId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
