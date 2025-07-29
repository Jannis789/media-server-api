import { Migration } from '@mikro-orm/migrations';

export class Migration20250729113109 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table \`session\` rename column \`id\` to \`uuid\`;`);
  }

}
