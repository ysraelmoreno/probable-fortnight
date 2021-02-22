import {MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterDescriptionTypeToText1614000924946 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn(
        'courses', 'description'
      );

      await queryRunner.addColumn(
        'courses',
        new TableColumn({
          name: 'description',
          type: 'text',
          isNullable: true,
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('courses', 'description')

      await queryRunner.addColumn(
        'courses',
        new TableColumn({
          name: 'description',
          type: 'varchar'
        })
      );
    }

}
