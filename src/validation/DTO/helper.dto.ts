import { IsDate, IsOptional, IsUUID } from "class-validator";

class UUIDParam{
  @IsUUID()
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}

class DateParam {
    
    @IsDate()
    date: Date;
    constructor(date: Date) {
        this.date = date;
    }
}

export { UUIDParam, DateParam };