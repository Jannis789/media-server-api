import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "../index"; 
import { IsUUID } from "class-validator";

@Entity()
export class Session {
  @PrimaryKey()
  @IsUUID()
  uuid: string = crypto.randomUUID();

  @ManyToOne(() => User)
  user!: User;

  @Property({ type: "datetime" })
  createdAt?: Date = new Date();

  @Property()
  expiresAt!: Date;
}