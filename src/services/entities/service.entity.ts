import { Parking } from "src/parkings/entities/parking.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'service' })
export class Service {
    @PrimaryGeneratedColumn()
    service_id: number;

    @Column({nullable : false})
    service_name: string;

    @ManyToMany(() => Parking, (parking) => parking.services)
    parkings:Parking[]
}
