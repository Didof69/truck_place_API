import { Opinion } from "src/opinions/entities/opinion.entity";
import { Parking } from "src/parkings/entities/parking.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

  @OneToMany(() => Parking, (parking) => parking.user)
  parkings: Parking[];

  @OneToMany(() => Opinion, (opinion) => opinion.parking)
  opinions: Opinion[];
}
