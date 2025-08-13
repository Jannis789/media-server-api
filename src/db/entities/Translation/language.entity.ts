import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Language {
    @PrimaryKey()
    id!: number;

    @Property({ unique: true })
    code!: string;

    @Property({ unique: true })
    name!: string;

    @Property({ nullable: true })
    nativeName?: string;
}