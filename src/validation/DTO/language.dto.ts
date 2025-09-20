import { Entity } from "@mikro-orm/core";
import { IsOptional, IsString, Length } from "class-validator";
import { Language } from "../../db/entities";
import { IsAviable } from "../decorators";
import { fetchTranslation } from "../../utils/translations/translator";

@Entity()
export class GetLanguageBody {
    @IsOptional()
    @IsString({ message: fetchTranslation("not_a_string") })
    @Length(2, 5, { message: fetchTranslation("language_code_length") })
    @IsAviable(Language, "code")
    code?: string;

    @IsOptional()
    @IsString({ message: fetchTranslation("not_a_string") })
    @IsAviable(Language, "name", { message: fetchTranslation("language_not_found") })
    name?: string;

    @IsOptional()
    @IsString({ message: fetchTranslation("not_a_string") })
    @IsAviable(Language, "nativeName", { message: fetchTranslation("language_not_found") })
    nativeName?: string;
}