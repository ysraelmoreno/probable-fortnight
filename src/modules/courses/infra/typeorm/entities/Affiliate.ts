import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import User from '@modules/users/infra/typeorm/entities/User'
import Course from '@modules/courses/infra/typeorm/entities/Course'

@Entity('affiliates')
class Affiliate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  courseId: string;

  @OneToMany(() => Course, course => course.id)
  @JoinColumn({ name: 'courseId' })
  course: User;

  @Column()
  affiliateId: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'affiliateId' })
  affiliate: User;

  @Column()
  type: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date

}

export default Affiliate
