import { MigrationInterface, QueryRunner } from "typeorm";

export class NewOperation1688309426157 implements MigrationInterface {
    name = 'NewOperation1688309426157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`operation\` (\`id\` varchar(36) NOT NULL, \`type\` varchar(255) NOT NULL, \`cost\` decimal NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_cd0195651a1f3814d39050c74f\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isDeleted\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isDeleted\``);
        await queryRunner.query(`DROP INDEX \`IDX_cd0195651a1f3814d39050c74f\` ON \`operation\``);
        await queryRunner.query(`DROP TABLE \`operation\``);
    }

}
