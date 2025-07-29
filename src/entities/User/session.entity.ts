import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import { User } from "./user.entity";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class Session {
  @Field(() => Int)
  @PrimaryKey()
  id!: string;

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
