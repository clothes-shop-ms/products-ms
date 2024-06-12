import {IsNumber, IsString, Min} from "class-validator";
import {Type} from "class-transformer";

export class CreateProductDto {
    @IsString()
    readonly name: string;
    @IsNumber({
        maxDecimalPlaces: 2,
    })
    @Min(0)
    @Type(() => Number)
    readonly price: number;
}
