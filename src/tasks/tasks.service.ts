import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { UserActiveInterface } from 'src/user/interfaces/user-active.interface';
import { Roles } from 'src/user/enums/roles.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  async create(createTaskDto: CreateTaskDto, user: UserActiveInterface) {
    const task = await this.taskRepository.save({
      ...createTaskDto,
      userEmail: user.email,
    });
    return task;
  }

  async findAll(user: UserActiveInterface) {
    const tasks = await this.taskRepository.find({
      where: {
        userEmail: user.email
      }
    });
    return tasks;
  }

  async findOne(id: number, user: UserActiveInterface) {
    const task = await this.taskRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`No found task with id ${id}`);
    }
    this.validateOwnership(task, user);
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, user: UserActiveInterface) {
    await this.findOne(id, user);

    return await this.taskRepository.update(id, updateTaskDto);
  }

  async remove(id: number, user: UserActiveInterface) {
    await this.findOne(id, user);

    return await this.taskRepository.delete({ id });
  }

  private validateOwnership(task: Task, user: UserActiveInterface) {
    if (user.role !== Roles.ADMIN && task.userEmail !== user.email) {
      throw new UnauthorizedException();
    }
  }
}
