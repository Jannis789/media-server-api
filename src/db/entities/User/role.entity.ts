import { Entity, PrimaryKey, Property, ManyToMany, Collection } from '@mikro-orm/core';
import { User } from '../index';

@Entity()
export class Role {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  name!: string;

  @ManyToMany(() => User, user => user.roles, { owner: false })
  users = new Collection<User>(this);
}
