import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import { User } from "./user.entity.ts";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class Session {
  @Field(() => String)
  @PrimaryKey()
  uuid!: string;

  @Field(() => User)
  @ManyToOne(() => User)
  user!: User;

  @Field(() => Date)
  @Property()
  createdAt: Date = new Date();

  @Field(() => Date, { nullable: true })
  @Property({ nullable: true })
  expiresAt?: Date;
}
