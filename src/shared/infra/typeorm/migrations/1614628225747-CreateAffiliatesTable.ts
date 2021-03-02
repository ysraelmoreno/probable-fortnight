import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAffiliatesTable1614628225747 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'affiliates',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },
            {
              name: 'courseId',
              type: 'uuid',
              isNullable: false,
            },
            {
              name: 'affiliateId',
              type: 'uuid',
              isNullable: false,
            },
            {
              name: 'type',
              type: 'varchar',
              isNullable: false
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
        )

        await queryRunner.createForeignKey(
          'affiliates',
          new TableForeignKey({
            name: 'AffiliateId',
            columnNames: ['affiliateId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
         }))

         await queryRunner.createForeignKey(
          'affiliates',
          new TableForeignKey({
            name: 'CourseId',
            columnNames: ['courseId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'courses',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
         }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('affiliates', 'CourseId')
      await queryRunner.dropForeignKey('affiliates', 'AffiliateId')

      await queryRunner.dropTable('affiliates')
    }

}
