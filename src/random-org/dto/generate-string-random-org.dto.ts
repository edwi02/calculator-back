import { IsOptional } from "class-validator"

export class GenerateRandomRandomOrgDto {

    @IsOptional()
    quantity?: number;
    
    @IsOptional()
    length?: number;

    @IsOptional()
    characters?: string;

    @IsOptional()
    replacement?: boolean;

}
