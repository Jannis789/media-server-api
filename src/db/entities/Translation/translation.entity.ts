import { Entity, ManyToOne, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { Language } from "./language.entity";

@Unique({ properties: ["key", "language"] })
@Entity()
export class Translation {
    @PrimaryKey()
    id!: number;

    @ManyToOne(() => Language, { nullable: false })
    language!: Language;

    @Property()
    key!: string;

    @Property()
    value!: string;

    @Property({ nullable: true })
    description?: string;

    @Property({ type: "datetime" })
    created_at: Date = new Date();

    @Property({
        type: "datetime",
        onUpdate: () => new Date(),
    })
    updated_at: Date = new Date();
}