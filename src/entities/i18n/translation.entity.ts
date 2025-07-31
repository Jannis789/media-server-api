import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import { ObjectType, Field, Int } from "type-graphql";
import { Language } from "./language.entity.ts";

@ObjectType()
@Entity()
export class Translation {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property()
  key!: string;

  @Field(() => Language)
  @ManyToOne(() => Language)
  language!: Language;

  @Field(() => String)
  @Property()
  text!: string;
}
