import { MigrationInterface, QueryRunner } from "typeorm";

export class NewUserBalance1688426734549 implements MigrationInterface {
    name = 'NewUserBalance1688426734549'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_balance\` (\`id\` varchar(36) NOT NULL, \`balance\` int NOT NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` varchar(36) NULL, UNIQUE INDEX \`REL_8fdba3bca96f8af1a318a6e25d\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_balance\` ADD CONSTRAINT \`FK_8fdba3bca96f8af1a318a6e25db\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_balance\` DROP FOREIGN KEY \`FK_8fdba3bca96f8af1a318a6e25db\``);
        await queryRunner.query(`DROP INDEX \`REL_8fdba3bca96f8af1a318a6e25d\` ON \`user_balance\``);
        await queryRunner.query(`DROP TABLE \`user_balance\``);
    }

}
