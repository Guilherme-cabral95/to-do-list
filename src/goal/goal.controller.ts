import { Body, Controller, Delete, Get, Param, Post, Put,Query , ValidationPipe,  UseInterceptors, ParseUUIDPipe, Header  } from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalDto } from './dto/goal.dto';
import { UpdatedGoalDto } from './dto/updateGoal.dto';
import { GoalInterceptor } from './goal.interceptor';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiResponse,
  ApiTags,

} from '@nestjs/swagger';
import { QueryDTO } from './dto/query.dto';
import { GoalGateway } from 'src/gateway/goal.gateway';



@ApiBearerAuth()
@Controller('goal')
@ApiTags('goal')
@ApiResponse({ status: 401 , description: 'não autorizado .' })
@ApiResponse({ status: 400 , description: 'inserir campos obrigatório' })
@ApiResponse({ status: 403 , description: 'precisa do csrfToken' })
@UseInterceptors(GoalInterceptor)
export class GoalController {
  constructor(private readonly goalService:GoalService, private readonly GoalGateway: GoalGateway) {}

 
  @Get('list_goals')
  @ApiResponse({ status: 200 , description: 'lista de tarefas .' })
  async getListGoals( @Query(new ValidationPipe) Query:QueryDTO ) {
    return await this.goalService.findAll(Query);
  }


  @Get('search_goal/:id')
  @ApiResponse({ status: 200 , description: 'lista de tarefas .' })
  async getGoal( @Param('id', new ParseUUIDPipe()) id: string) {
    
    return await this.goalService.findOne(id);
  }

  @Post('new_goal')
  @ApiResponse({ status: 200 , description: 'criado com sucesso .' })
  @ApiHeader({
    name: 'X-CSRF-Token',
    description: 'Token CSRF válido fornecido no cabeçalho da solicitação.',
    required: true, 
  })
  
  async setNewGoal(@Body(new ValidationPipe) GoalDto: GoalDto){
    await this.goalService.create(GoalDto)
    return { message:"criado com sucesso"}

  }

  @Put('updated_goal/:id')
  @ApiResponse({ status: 200 , description: 'alterado com sucesso .' })
  @ApiHeader({
    name: 'X-CSRF-Token',
    description: 'Token CSRF válido fornecido no cabeçalho da solicitação.',
    required: true, 
  })
  async updatedGoal(@Param('id', new ParseUUIDPipe()) id: string,@Body(new ValidationPipe) UpdatedGoalDto:UpdatedGoalDto){
    const updated_goal = await this.goalService.update(id, UpdatedGoalDto)
    await this.GoalGateway.notifyUpdateGoal(updated_goal)
    return {
      message:"alterado com sucesso"
    }
  }

  @Delete('deleted_goal/:id')
  @ApiResponse({ status: 200 , description: 'deletado com sucesso .' })
  @ApiHeader({
    name: 'X-CSRF-Token',
    description: 'Token CSRF válido fornecido no cabeçalho da solicitação.',
    required: true, 
  })
  async deleteGoal(@Param('id', new ParseUUIDPipe()) id: string){
    await this.goalService.delete(id)
    return { message:"deletado com sucesso"}
  }


}

