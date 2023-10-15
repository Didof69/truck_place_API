import { Parking } from "src/parkings/entities/parking.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Opinion {
  @PrimaryGeneratedColumn()
  opinion_id: number;

  @Column({ nullable: false })
  opinion: string;

  @Column({ nullable: false, type: 'int' })
  note: number;

  @Column({ nullable: false, type: 'int' })
  user_id: number;

  @Column({ nullable: false, type: 'int' })
  parking_id: number;

  @ManyToOne(() => Parking, (parking) => parking.opinions)
  @JoinColumn({ name: 'parking_id' })
  parking: Parking;
}
