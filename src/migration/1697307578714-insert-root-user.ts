import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertRootUser1697307578714 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `
            INSERT INTO public."user"(
                name, email, cpf, type_user, phone, password
            ) VALUES ('root', 'root@root.com', '33333333333', 2, '13999999999', '$2b$10$cTVmSOZ8DJ8HFy7LO8PrYefNy7VpuIfl7uIl/l0.RuxzPGWtX0gjC');
        `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
            DELETE FROM public."user" WHERE email = 'root@root.com';
        `);
  }
}
