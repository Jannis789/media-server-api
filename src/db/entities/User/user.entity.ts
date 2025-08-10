import { Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { IsInt, Min, IsEmail } from "class-validator";
import { Role } from "../index";

@Entity()
class User {
  @PrimaryKey()
  @IsInt({ message: "ID muss eine ganze Zahl sein" })
  @Min(1, { message: "ID muss mindestens 1 sein" })
  id!: number;

  @Property({ unique: true })
  username!: string;

  @Property({ unique: true })
  @IsEmail()
  email!: string;

  @Property()
  password_hash!: string;
  @Property({
    type: "datetime",
  })
  created_at: Date = new Date();

  @Property({
    type: "datetime",
    onUpdate: () => new Date(),
  })
  updated_at: Date = new Date();

  @Property({ default: true })
  is_active!: boolean;

  @ManyToMany(() => Role, role => role.users, { owner: true, eager: true })
  roles = new Collection<Role>(this);
}

export { User };