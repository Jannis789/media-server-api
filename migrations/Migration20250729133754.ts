import { Migration } from '@mikro-orm/migrations';

export class Migration20250729133754 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`user\` (\`id\` integer not null primary key autoincrement, \`username\` text not null, \`email\` text not null, \`password_hash\` text not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`is_active\` integer not null default true);`);
    this.addSql(`create unique index \`user_email_unique\` on \`user\` (\`email\`);`);

    this.addSql(`create table \`session\` (\`uuid\` text not null, \`user_id\` integer not null, \`created_at\` datetime not null, \`expires_at\` datetime null, constraint \`session_user_id_foreign\` foreign key(\`user_id\`) references \`user\`(\`id\`) on update cascade, primary key (\`uuid\`));`);
    this.addSql(`create index \`session_user_id_index\` on \`session\` (\`user_id\`);`);
  }

}
