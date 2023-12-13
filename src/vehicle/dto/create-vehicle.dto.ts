import { Transform } from "class-transformer";
import { IsArray, IsIn, IsInt, 
    IsNumber, IsOptional, 
    IsPositive, IsString, MinLength } from "class-validator";

export class CreateVehicleDto {

    // @Transform(({ value }) => value.toLowerCase())
    // @IsString()
    // @MinLength(1)
    // id: string;


    @IsString()
    plate: string;


    @IsString()
    description: string;


    // @IsString()
    // @MinLength(1)
    // description: string;


    // @IsString()
    // @IsOptional()
    // country:string;

}