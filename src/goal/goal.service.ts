import { Injectable, BadRequestException } from '@nestjs/common';
import { UpdatedGoalDto } from './dto/updateGoal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goal } from './entity/goal.entity';
import { GoalDto } from './dto/goal.dto';
import { QueryDTO } from './dto/query.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GoalService {

  private Goal: Goal = new Goal  

  constructor( @InjectRepository(Goal)
  private GoalRepository: Repository<Goal>,) {}

  async findOne(id:string) {
    return await this.GoalRepository.findOne({where:{
      id:id
    }})
  }

  async findAll(queryDto :QueryDTO){
    const query = this.GoalRepository.createQueryBuilder('test')
    if(queryDto.sort){
      query.addOrderBy(queryDto.sort,'ASC')
    }
    if(queryDto.limit){
      query.take(queryDto.limit)
    }
    
    if(queryDto.page){
    
      query.skip( (queryDto.page - 1) * queryDto.limit | 0 )
    }

    return query.getMany()
  }
  
  async create(new_goal: GoalDto){
    this.Goal.id = uuidv4()
    this.Goal.titulo = new_goal.titulo
    this.Goal.descricao = new_goal.descricao
    this.Goal.data_criacao = new Date()

    return await this.GoalRepository.insert(this.Goal) 
  }

  async update(id: string, updated_goal: UpdatedGoalDto){
    const update = await this.GoalRepository.findOne({where:{
      id:id
    }})
    

    if(!update){
      throw new BadRequestException("don´t exists this goal")
    }
    
    
    const current = new Date()
    this.Goal.id = update.id
    this.Goal.titulo = updated_goal.titulo
    this.Goal.descricao = updated_goal.descricao
    this.Goal.concluida = updated_goal.concluido
    this.Goal.data_criacao = update.data_criacao
    this.Goal.data_atualizacao = current



    await this.GoalRepository.merge(update,this.Goal)

    return await this.GoalRepository.save(update);
  }

  async delete(id: string){
    const delete_goal = await this.GoalRepository.findOneBy({id})
    

    if(!delete_goal){
      throw new BadRequestException("don´t exists this goal")
    }

    

    return await this.GoalRepository.remove(delete_goal)
  }

  
}
