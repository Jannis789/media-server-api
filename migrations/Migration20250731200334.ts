import { Migration } from '@mikro-orm/migrations';

export class Migration20250731200334 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`language\` (\`id\` integer not null primary key autoincrement, \`iso_code\` text not null, \`name\` text not null);`);
    this.addSql(`create unique index \`language_iso_code_unique\` on \`language\` (\`iso_code\`);`);

    this.addSql(`create table \`translation\` (\`id\` integer not null primary key autoincrement, \`key\` text not null, \`language_id\` integer not null, \`text\` text not null, constraint \`translation_language_id_foreign\` foreign key(\`language_id\`) references \`language\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`translation_language_id_index\` on \`translation\` (\`language_id\`);`);
  }

}
