import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1755743245423 implements MigrationInterface {
    name = 'InitialMigration1755743245423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "telefone" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "admin" boolean NOT NULL, "ativo" boolean NOT NULL, CONSTRAINT "UQ_deccf50d27a5325ed5eff8000d3" UNIQUE ("telefone"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "funcionario" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, CONSTRAINT "PK_2c5d0c275b4f652fd5cb381655f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ddsemana" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "horaInicial" TIME NOT NULL, "horaFinal" TIME NOT NULL, CONSTRAINT "PK_e14fef2b5948f3fce6a43483239" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agenda" ("id" SERIAL NOT NULL, "hora" TIME NOT NULL, "diaMes" character varying NOT NULL, "mes" character varying NOT NULL, "ano" character varying NOT NULL, "usuarioId" integer, "funcionarioId" integer, "ddsemanaId" integer, CONSTRAINT "PK_49397cfc20589bebaac8b43251d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "agenda" ADD CONSTRAINT "FK_932638af43ef28915e0eae58a95" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agenda" ADD CONSTRAINT "FK_ed3aed29933b42f27bfdb99bc83" FOREIGN KEY ("funcionarioId") REFERENCES "funcionario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "agenda" ADD CONSTRAINT "FK_8a71cbdffade0caf284019de4bd" FOREIGN KEY ("ddsemanaId") REFERENCES "ddsemana"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agenda" DROP CONSTRAINT "FK_8a71cbdffade0caf284019de4bd"`);
        await queryRunner.query(`ALTER TABLE "agenda" DROP CONSTRAINT "FK_ed3aed29933b42f27bfdb99bc83"`);
        await queryRunner.query(`ALTER TABLE "agenda" DROP CONSTRAINT "FK_932638af43ef28915e0eae58a95"`);
        await queryRunner.query(`DROP TABLE "agenda"`);
        await queryRunner.query(`DROP TABLE "ddsemana"`);
        await queryRunner.query(`DROP TABLE "funcionario"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
