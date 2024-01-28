import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1706339352883 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `CREATE TABLE users (id BIGSERIAL PRIMARY KEY, username varchar(128), email varchar(128), password varchar(128), createdAt TIMESTAMP, secretKey TEXT, totpStatus BOOLEAN, emailConfirmed BOOLEAN, confirmationToken TEXT, isDisabled BOOLEAN)`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        `ALTER TABLE users`
    }

}
