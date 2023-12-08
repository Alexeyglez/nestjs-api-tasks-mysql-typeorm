import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "../enums/roles.enum";
import { Task } from "../../tasks/entities/task.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;    

    @Column({nullable: false})
    password: string;

    @Column({unique: true, nullable: false})
    email: string;

    @Column({ type: 'enum', default: Roles.USER, enum: Roles })
    role: Roles;

    @DeleteDateColumn()
    deletedAt: Date;

    @OneToMany(() => Task, (task) => task.userEmail)
    tasks: Task[];
}
