import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { Parking } from './entities/parking.entity';
import { Subscribe } from 'src/subscribes/entities/subscribe.entity';

@Injectable()
export class ParkingsService {
  constructor(
    @InjectRepository(Parking) private parkingsRepository: Repository<Parking>,
  ) {}

  async create(createParkingDto: CreateParkingDto, user_id: number) {
    const newParking = this.parkingsRepository.create(createParkingDto);
    newParking.user_id = user_id;
    const result = this.parkingsRepository.save(newParking);
    return result;
  }

  findAll() {
    return this.parkingsRepository.find();
  }

  async findOne(id: number) {
    const found = await this.parkingsRepository.findOneBy({ parking_id: id });
    if (!found) {
      throw new NotFoundException(`Parking with the id ${id} not found`);
    }
    return found;
  }

  async update(id: number, updateParkingDto: UpdateParkingDto) {
    let parking = await this.findOne(id);

    //permet de mettre à jour les services si des services étaient déjà enregistrés
    if (parking.services) {
      parking.services = updateParkingDto.services;
    }

    const updatedParking = this.parkingsRepository.merge(
      parking,
      updateParkingDto,
    );

    const result = await this.parkingsRepository.save(updatedParking);
    return result;
  }

  async getLikesForParking(parking_id: number) {
    const query = `
      SELECT "user"."user_id"
      FROM "like"
      INNER JOIN "user" ON "like"."user_id" = "user"."user_id"
      WHERE "like"."parking_id" = $1
    `;
    return this.parkingsRepository.query(query, [parking_id]);
  }

  async getSubscribesForParking(parking_id: number) {
    const query = `
      SELECT "subscribe".*
      FROM "subscribe"
      WHERE "subscribe"."parking_id" = $1
    `;
    return this.parkingsRepository.query(query, [parking_id]);
  }

  //supprime les parkings
  async remove(parking_id: number, user_id: number) {
    const parking = await this.findOne(parking_id);

    //supprime tous les favoris concernant le parking
    const getLikesForParking = await this.getLikesForParking(parking_id);
    getLikesForParking.forEach(() => {
      const query = `
      DELETE FROM "like"
      WHERE "like"."parking_id" = $1
    `;
      this.parkingsRepository.query(query, [parking_id]);
    });

    //supprime tous les abonnements concernant le parking
    const getSubscribesForParking =
      await this.getSubscribesForParking(parking_id);
    getSubscribesForParking.forEach((subscribe: Subscribe) => {
      const query = `
      DELETE FROM "subscribe"
      WHERE "subscribe"."subscribe_id" = $1
    `;
      this.parkingsRepository.query(query, [subscribe.subscribe_id]);
    });

    //supprime le parking une fois les favoris et abonnements gérés
    return this.parkingsRepository.remove(parking);
  }
}
