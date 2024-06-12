import { PaginationDto } from './pagination.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class GetParams {
    @IsOptional()
    @ValidateNested()
    @Type(() => PaginationDto)
    readonly pagination?: PaginationDto;
}
