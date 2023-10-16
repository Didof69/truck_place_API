import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Location {
  @PrimaryColumn({ nullable: false })
  insee_code: string;

  @Column({ nullable: false })
  zip_code: string;

  @Column({ nullable: false })
  city_name: string;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 9,
    scale: 6,
  })
  longitude: string;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 9,
    scale: 6,
  })
  latitude: string;
}
