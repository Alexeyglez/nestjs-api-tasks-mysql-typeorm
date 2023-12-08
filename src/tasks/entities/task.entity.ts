import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../enums/task.enum';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: 'enum', default: TaskStatus.OPEN, enum: TaskStatus })
  status: TaskStatus;
  
  @ManyToOne(() => User)
  @JoinColumn({name: 'userEmail', referencedColumnName: 'email'})
  user: User;

  @Column()
  userEmail: string;
}
