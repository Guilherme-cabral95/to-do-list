import { Entity, Column, PrimaryGeneratedColumn,  CreateDateColumn } from 'typeorm';


@Entity()
export class Goal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type:'varchar',
  })
  titulo: string;

  @Column({
    type:'text'
  })
  descricao: string;

  @CreateDateColumn()
  data_criacao:Date

  @Column({nullable:true, type:'datetime'})
  data_atualizacao:Date
  
  @Column({ default: false, type: 'bool' })
  concluida: boolean;
}