import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class GoalDto{
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
    

}