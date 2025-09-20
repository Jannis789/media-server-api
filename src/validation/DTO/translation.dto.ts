import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { Language } from "../../db/entities";
import { Type } from "class-transformer";
import { IsAviable } from "../decorators";
import { fetchTranslation } from "../../utils/translations/translator";

class GetTranslationBody {
    @IsOptional()
    @IsNumber({},{ message: fetchTranslation("not_a_number") })
    id?: number;

    @IsOptional()
    @IsString({ message: fetchTranslation("not_a_string") })
    key?: string;

    @IsOptional()
    @IsString({ message: fetchTranslation("not_a_string") })
    value?: string;

    @IsOptional()
    @IsString({ message: fetchTranslation("not_a_string") })
    description?: string;

    @IsOptional()
    @IsDate({ message: fetchTranslation("not_a_date") })
    created_at?: Date;

    @IsOptional()
    @IsDate({ message: fetchTranslation("not_a_date") })
    updated_at?: Date;
}

class UpdateTranslationBody {
    @IsOptional()
    @IsString({ message: fetchTranslation("not_a_string") })
    key?: string;

    @IsOptional()
    @IsString({ message: fetchTranslation("not_a_string") })
    value?: string;

    @IsOptional()
    @IsAviable(Language, "code", { message: fetchTranslation("language_not_found") })
    language?: Language;

    @IsOptional()
    description?: string | null;
}

class SinceDto {
    @IsOptional()
    @Type(() => Date)
    @IsDate({ message: fetchTranslation("not_a_date") })
    since: Date;
    constructor(since: Date) {
        this.since = since;
    }
}

class LanguageCodeParam {
  @IsString({ message: fetchTranslation("not_a_string") })
  @IsAviable(Language, "code", { message: fetchTranslation("language_not_found") })
  language_code!: string;
}

export { 
    GetTranslationBody, 
    UpdateTranslationBody, 
    SinceDto, 
    LanguageCodeParam 
};