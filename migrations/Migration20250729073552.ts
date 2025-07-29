import { Migration } from '@mikro-orm/migrations';

export class Migration20250729073552 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`user\` (\`id\` integer not null primary key autoincrement, \`username\` text not null, \`email\` text not null, \`password_hash\` text not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`is_active\` integer not null default true);`);
    this.addSql(`create unique index \`user_email_unique\` on \`user\` (\`email\`);`);
  }

}
