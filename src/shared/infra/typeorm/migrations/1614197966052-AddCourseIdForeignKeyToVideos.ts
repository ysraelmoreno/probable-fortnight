import {MigrationInterface, QueryRunner, TableForeignKey, TableColumn} from "typeorm";

export class AddCourseIdForeignKeyToVideos1614197966052 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'videos',
        new TableColumn({
          name: 'courseId',
          type: 'uuid',
          isNullable: true,
        })
      );
      await queryRunner.createForeignKey(
        'videos',
        new TableForeignKey({
          name: 'CourseId',
          columnNames: ['courseId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'courses',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('videos', 'CourseId')

      await queryRunner.dropColumn('videos', 'courseId')

    }

}
