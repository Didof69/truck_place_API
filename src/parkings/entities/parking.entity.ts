import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  longitude: number;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 9,
    scale: 6,
  })
  latitude: number;

  @Column({ nullable: false, type: 'int' })
  nb_space_all: number;

  @Column({ nullable: false, type: 'int' })
  nb_space_free: number;

  @Column({ nullable: false, type: 'date' })
  registration_date: Date;

  @Column({ nullable: false })
  public_view: boolean;

  @Column()
  main_road: string;

  @Column()
  direction: string;

  @Column({ nullable: false, type: 'int' })
  location_id: number;

  @Column({ nullable: false, type: 'int' })
  user_id: number;

  @Column({ type: 'int' })
  photo_id: number;
}
