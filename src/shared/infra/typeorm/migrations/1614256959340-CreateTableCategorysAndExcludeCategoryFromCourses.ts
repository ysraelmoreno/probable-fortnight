import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableColumn } from "typeorm";

export class CreateTableCategorysAndExcludeCategoryFromCourses1614256959340 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn(
        'courses', 'category'
      );

      await queryRunner.createTable(
        new Table({
          name: 'category',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'createdAt',
              type: 'timestamp',
              default: 'now()'
            },
            {
              name: 'updatedAt',
              type: 'timestamp',
              default: 'now()'
            },
          ]
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

      await queryRunner.dropTable('category')

      await queryRunner.addColumn( 'courses', new TableColumn(
        {
          name: 'category',
          type: 'varchar',
          isNullable: true,
        },
      ))

    }

}
