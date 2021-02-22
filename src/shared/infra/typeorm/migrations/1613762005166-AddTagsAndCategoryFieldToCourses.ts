import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddTagsAndCategoryFieldToCourses1613762005166 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn( 'courses', new TableColumn(
        {
          name: 'category',
          type: 'varchar',
          isNullable: true,
        },
      ))

      await queryRunner.addColumn( 'courses', new TableColumn(
        {
          name: 'tags',
          type: 'text[]',
          isNullable: true,
        },
      ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('courses', 'tags')
      await queryRunner.dropColumn('courses', 'category')
    }

}
