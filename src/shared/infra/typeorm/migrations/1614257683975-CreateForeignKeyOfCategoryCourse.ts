import {MigrationInterface, QueryRunner, TableForeignKey, TableColumn} from "typeorm";

export class CreateForeignKeyOfCategoryCourse1614257683975 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('courses',
      new TableColumn({
        name: 'categoryId',
        type: 'uuid',
        isNullable: true,
      }))

      await queryRunner.createForeignKey(
        'courses',
        new TableForeignKey({
          name: 'CategoryId',
          columnNames: ['categoryId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'category',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('courses', 'CourseCategory')

      await queryRunner.dropColumn('courses', 'categoryId')
    }

}
