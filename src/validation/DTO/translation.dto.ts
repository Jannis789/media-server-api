import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { Language } from "../../db/entities";
import { Type } from "class-transformer";
import { IsAviable } from "../decorators";


class GetTranslationBody {
    @IsOptional()
    @IsNumber()
    id?: number;

    @IsOptional()
    @IsString()
    key?: string;

    @IsOptional()
    @IsString()
    value?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsDate()
    created_at?: Date;

    @IsOptional()
    @IsDate()
    updated_at?: Date;
}

class UpdateTranslationBody {
    @IsOptional()
    key?: string;

    @IsOptional()
    value?: string;

    @IsOptional()
    language?: Language;

    @IsOptional()
    description?: string | null;
}

class SinceDto {
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    since: Date;
    constructor(since: Date) {
        this.since = since;
    }
}

class LanguageCodeParam {
  @IsString()
  @IsAviable(Language, "code")
  language_code!: string;
}

export { GetTranslationBody, UpdateTranslationBody, SinceDto, LanguageCodeParam };