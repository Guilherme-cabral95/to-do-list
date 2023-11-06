import { IsNotEmpty,IsBoolean } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UpdatedGoalDto{

     @IsNotEmpty({
        message:'the field  titulo is not null or empty'
    })
    @ApiProperty({
        description:'este campo  é obrigatório'
    })
    titulo:string
    @IsNotEmpty({
        message:'the field descricao is not null or empty'
    })
    @ApiProperty({
        description:'este campo  é obrigatório'
    })
    descricao:string

    @IsBoolean({message:'the field concluido  is value can just true or false'})
    @ApiProperty({
        description:'este campo  é obrigatório'
    })
    concluido:boolean

}