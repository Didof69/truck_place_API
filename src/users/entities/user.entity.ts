import { Opinion } from "src/opinions/entities/opinion.entity";
import { Parking } from "src/parkings/entities/parking.entity";
import { Subscribe } from "src/subscribes/entities/subscribe.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ nullable: false })
  pseudo: string;

  @Column({ nullable: false })
  user_name: string;

  @Column({ nullable: false })
  firstname: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  admin: boolean;

  @Column()
  photo_id: number;

  @Column({ nullable: false })
  is_delete: boolean;

  @OneToMany(() => Parking, (parking) => parking.user, {cascade:true})
  parkings: Parking[];

  //relation opinion
  @OneToMany(() => Opinion, (opinion) => opinion.parking)
  opinions: Opinion[];

  //relation subscribe
  @OneToMany(() => Opinion, (subscribe) => subscribe.parking)
  subscribes: Subscribe[];

  //relation like
  @ManyToMany(() => Parking, {eager: true})
  @JoinTable({
    name: 'like',
    joinColumn: { name: 'user_id', referencedColumnName: 'user_id' },
    inverseJoinColumn: {
      name: 'parking_id',
      referencedColumnName: 'parking_id',
    },
  })
    
  likedParkings: Parking[];
}
