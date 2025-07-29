import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property()
  username!: string;

  @Field(() => String)
  @Property({ unique: true })
  email!: string;


    @Field(() => Boolean)
    @Property({ default: true })
    is_active: boolean = true;

    @Property()
    password_hash!: string;

  @Field(() => Date)
  @Property({ onCreate: () => new Date() })
  created_at: Date = new Date();

  @Field(() => Date)
  @Property({ onUpdate: () => new Date(), onCreate: () => new Date() })
  updated_at: Date = new Date();
}
