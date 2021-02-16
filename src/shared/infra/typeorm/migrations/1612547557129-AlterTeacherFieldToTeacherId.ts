import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AlterTeacherFieldToTeacherId1612547557129 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn(
        'courses', 'teacher'
      );

      await queryRunner.addColumn(
        'courses',
        new TableColumn({
          name: 'teacherId',
          type: 'uuid',
          isNullable: true,
        })
      );

      await queryRunner.createForeignKey(
        'courses',
        new TableForeignKey({
          name: 'CourseTeacher',
          columnNames: ['teacherId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE'
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('courses', 'CourseTeacher')

      await queryRunner.dropColumn('courses', 'teacherId')

      await queryRunner.addColumn(
        'courses',
        new TableColumn({
            name: 'teacher',
            type: 'varchar'
        }))
    }

}
