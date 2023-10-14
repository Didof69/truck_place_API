import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
