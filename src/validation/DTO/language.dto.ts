import { Entity } from "@mikro-orm/core";
import { IsOptional, IsString, Length } from "class-validator";
import { Language } from "../../db/entities";
import { IsAviable } from "../decorators";

@Entity()
export class GetLanguageBody {
    @IsOptional()
    @IsString()
    @Length(2, 5)
    @IsAviable(Language, "code")
    code?: string;

    @IsOptional()
    @IsString()
    @IsAviable(Language, "name")
    name?: string;

    @IsOptional()
    @IsString()
    @IsAviable(Language, "nativeName")
    nativeName?: string;
}