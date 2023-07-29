import { IsOptional } from "class-validator"

export class GenerateRandomStringOrgDto {

    @IsOptional()
    quantity?: number;
    
    @IsOptional()
    length?: number;

    @IsOptional()
    characters?: string;

    @IsOptional()
    replacement?: boolean;

}
