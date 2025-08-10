import { Migration } from '@mikro-orm/migrations';

export class Migration20250809234027 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`role\` (\`id\` integer not null primary key autoincrement, \`name\` text not null);`);
    this.addSql(`create unique index \`role_name_unique\` on \`role\` (\`name\`);`);

    this.addSql(`create table \`user\` (\`id\` integer not null primary key autoincrement, \`username\` text not null, \`email\` text not null, \`password_hash\` text not null, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`is_active\` integer not null default true);`);
    this.addSql(`create unique index \`user_username_unique\` on \`user\` (\`username\`);`);
    this.addSql(`create unique index \`user_email_unique\` on \`user\` (\`email\`);`);

    this.addSql(`create table \`session\` (\`uuid\` text not null, \`user_id\` integer not null, \`created_at\` datetime not null, \`expires_at\` datetime not null, constraint \`session_user_id_foreign\` foreign key(\`user_id\`) references \`user\`(\`id\`) on update cascade, primary key (\`uuid\`));`);
    this.addSql(`create index \`session_user_id_index\` on \`session\` (\`user_id\`);`);

    this.addSql(`create table \`user_roles\` (\`user_id\` integer not null, \`role_id\` integer not null, constraint \`user_roles_user_id_foreign\` foreign key(\`user_id\`) references \`user\`(\`id\`) on delete cascade on update cascade, constraint \`user_roles_role_id_foreign\` foreign key(\`role_id\`) references \`role\`(\`id\`) on delete cascade on update cascade, primary key (\`user_id\`, \`role_id\`));`);
    this.addSql(`create index \`user_roles_user_id_index\` on \`user_roles\` (\`user_id\`);`);
    this.addSql(`create index \`user_roles_role_id_index\` on \`user_roles\` (\`role_id\`);`);
  }

}
