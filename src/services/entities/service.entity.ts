import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'service' })
export class Service {
    @PrimaryGeneratedColumn()
    service_id: number;

    @Column({nullable : false})
    service_name: string;
}
