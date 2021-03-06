import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import User from '@modules/users/infra/typeorm/entities/User'
import CoursesCategory from './CoursesCategory';

import { Expose } from 'class-transformer'

@Entity('courses')
class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  tags: string;

  @Column()
  principalImage: string;

  @Column()
  categoryId: string;

  @OneToMany(() => CoursesCategory, coursescategory => coursescategory.id)
  @JoinColumn({ name: 'categoryId' })
  category: string;

  @Column()
  teacherId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'teacherId' })
  teacher: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date

  @Expose({ name: 'principalImageUrl'})
  getPrincipalImageUrl(): string | null {
    return this.principalImage ? `${process.env.APP_API_URL}/files/${this.principalImage}` : null;
  }

}

export default Course
