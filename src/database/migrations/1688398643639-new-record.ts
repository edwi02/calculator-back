import { MigrationInterface, QueryRunner } from "typeorm";

export class NewRecord1688398643639 implements MigrationInterface {
    name = 'NewRecord1688398643639'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`record\` (\`id\` varchar(36) NOT NULL, \`amount\` int NOT NULL, \`user_balance\` int NOT NULL, \`operation_response\` varchar(255) NOT NULL, \`date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` varchar(36) NULL, \`operation_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`record\` ADD CONSTRAINT \`FK_e28cccb0d33870ac1f81f7a727d\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`record\` ADD CONSTRAINT \`FK_dfb4a21d5021ce5c510d4855ed1\` FOREIGN KEY (\`operation_id\`) REFERENCES \`operation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`record\` DROP FOREIGN KEY \`FK_dfb4a21d5021ce5c510d4855ed1\``);
        await queryRunner.query(`ALTER TABLE \`record\` DROP FOREIGN KEY \`FK_e28cccb0d33870ac1f81f7a727d\``);
        await queryRunner.query(`DROP TABLE \`record\``);
    }

}
