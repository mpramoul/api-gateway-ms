import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateClientDto {
    @IsOptional()
    name:string;

    @IsOptional()
    surname:string;

    @IsString()
    @MaxLength(250,{message:'La razon social o nombre completo de cliente tiene un caracter maximo de 250'})
    full_name:string;

    @IsString()
    @MaxLength(30,{message:'El tipo de documento tiene un maximo de 30 caracteres'})
    type_document:string;

    @IsString()
    @MaxLength(30,{message:'El n° de documento tiene un maximo de 30 caracteres'})
    n_document:string;

    @IsEmail()
    @MaxLength(250,{message:'El email tiene un maximo de 250 caracteres'})
    email:string;

    @IsString()
    @MaxLength(15,{message:'El telefono tiene un maximo de 15 caracteres'})
    phone:string;

    @Type(() => Number)
    @IsNumber()
    type_client:number;//1 ES CLIENTE PERSONAL NATURAL Y 2 CLIENTE EMPRESA
}
