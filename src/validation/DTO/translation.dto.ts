import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";
import { Language } from "../../db/entities";
import { Type } from "class-transformer";


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

export { GetTranslationBody, UpdateTranslationBody, SinceDto };