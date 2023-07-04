import { MigrationInterface, QueryRunner } from "typeorm";

export class NewColumnRoleUser1688434685165 implements MigrationInterface {
    name = 'NewColumnRoleUser1688434685165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`roles\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roles\``);
    }

}
