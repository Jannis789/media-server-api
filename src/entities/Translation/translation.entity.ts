import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { ObjectType, Field } from 'type-graphql';
import { Language } from './language.entity.ts';

@ObjectType()
@Entity()
export class Translation {
    @Field(() => String)
    @PrimaryKey()
    key!: string;

    @Field(() => Language)
    @ManyToOne(() => Language)
    language!: Language;

    @Field(() => String)
    @Property()
    text!: string;

    @Field(() => Date)
    @Property({ onCreate: () => new Date() })
    created_at: Date = new Date();

    @Field(() => Date)
    @Property({ onUpdate: () => new Date(), onCreate: () => new Date() })
    updated_at: Date = new Date();
}
