import { IsDate, IsOptional, IsUUID } from "class-validator";

class UUIDParam{
  @IsUUID()
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}

export { UUIDParam };