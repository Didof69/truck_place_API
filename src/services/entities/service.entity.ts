import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'service' })
export class Service {
    @PrimaryGeneratedColumn()
    service_id: number;

    @Column()
    service_name: string;
}
