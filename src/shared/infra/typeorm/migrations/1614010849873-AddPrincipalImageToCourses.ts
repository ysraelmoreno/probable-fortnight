import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddPrincipalImageToCourses1614010849873 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('courses', new TableColumn ({
        name: 'principalImage',
        type: 'varchar'
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('courses', 'principalImage')
    }

}
