import { Opinion } from "src/opinions/entities/opinion.entity";
import { Service } from "src/services/entities/service.entity";
import { Subscribe } from "src/subscribes/entities/subscribe.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Parking {
  @PrimaryGeneratedColumn()
  parking_id: number;

  @Column({ nullable: false })
  parking_name: string;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 9,
    scale: 6,
  })
  latitude: string;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 9,
    scale: 6,
  })
  longitude: string;

  @Column({ nullable: false, type: 'int' })
  nb_space_all: number;

  @Column({ nullable: false, type: 'int' })
  nb_space_free: number;

  @Column({ nullable: false, type: 'timestamp' })
  registration_date: Date;

  @Column({ nullable: false })
  public_view: boolean;

  @Column()
  main_road: string;

  @Column()
  direction: string;

  @Column({ nullable: false, type: 'int' })
  insee_code: string;

  @Column({ nullable: false, type: 'int' })
  user_id: number;

  @Column({ type: 'int' })
  photo_id: number;

  @ManyToOne(() => User, (user) => user.user_id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  //relation equip
  @ManyToMany(() => Service, { eager: true })
  @JoinTable({
    name: 'equip',
    joinColumn: { name: 'parking_id', referencedColumnName: 'parking_id' },
    inverseJoinColumn: {
      name: 'service_id',
      referencedColumnName: 'service_id',
    },
  })
  services: Service[];

  //relation opinion
  @OneToMany(() => Opinion, (opinion) => opinion.parking)
  opinions: Opinion[];

  //relation subscribe
  @OneToMany(() => Subscribe, (subscribe) => subscribe.parking)
  subscribes: Subscribe[];

  //relation like
  @ManyToMany(() => User, (user) => user.likedParkings)
  users: User[];
}
