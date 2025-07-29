import { Migration } from '@mikro-orm/migrations';

export class Migration20250729095654 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`session\` (\`id\` text not null, \`user_id\` integer not null, \`created_at\` datetime not null, \`expires_at\` datetime null, constraint \`session_user_id_foreign\` foreign key(\`user_id\`) references \`user\`(\`id\`) on update cascade, primary key (\`id\`));`);
    this.addSql(`create index \`session_user_id_index\` on \`session\` (\`user_id\`);`);
  }

}
