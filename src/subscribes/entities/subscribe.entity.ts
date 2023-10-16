import { Parking } from "src/parkings/entities/parking.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subscribe {
  @PrimaryGeneratedColumn()
  subscribe_id: number;

  @Column({ nullable: false, type: 'timestamp' })
  unsubscribe_date: Date;

  @Column({ nullable: false, type: 'int' })
  user_id: number;

  @Column({ nullable: false, type: 'int' })
  parking_id: number;

  @ManyToOne(() => Parking, (parking) => parking.subscribes)
  @JoinColumn({ name: 'parking_id' })
  parking: Parking;

  @ManyToOne(() => User, (user) => user.subscribes, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
