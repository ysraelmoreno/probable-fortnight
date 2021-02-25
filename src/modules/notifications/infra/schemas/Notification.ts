import { Entity, ObjectID, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from 'typeorm'

@Entity('notifications')
class Notifications {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  content: string;

  @Column('uuid')
  recipientId: string;

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Notifications
