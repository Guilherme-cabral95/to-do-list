import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryDTO {
  @ApiPropertyOptional()
  @IsNotEmpty({message:'informe a pagina' })
  page: number = 1;

  @ApiPropertyOptional()
  @IsNotEmpty({message:'informe a limite'})
  limit: number = 10;


  @ApiPropertyOptional()
  @IsOptional()
  sort: string = "dataCriacao";

}