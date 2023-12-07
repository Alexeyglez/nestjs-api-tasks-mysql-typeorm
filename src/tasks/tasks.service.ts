import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    const task = await this.taskRepository.save(createTaskDto);
    return task;
  }

  async findAll() {
    const tasks = await this.taskRepository.find();
    return tasks;
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`No found task with id ${id}`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id);

    return await this.taskRepository.update(id, updateTaskDto);
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.taskRepository.delete({ id });
  }
}
