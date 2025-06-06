import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @Min(0)
    offset?: number;

    @IsOptional()
    @IsPositive()
    @Min(1)
    limit?: number;
}