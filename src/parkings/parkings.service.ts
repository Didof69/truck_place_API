import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { Parking } from './entities/parking.entity';

@Injectable()
export class ParkingsService {
  constructor(
    @InjectRepository(Parking) private parkingsRepository: Repository<Parking>,
  ) {}

  async create(createParkingDto: CreateParkingDto) {
    const newParking = this.parkingsRepository.create(createParkingDto);
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

  async remove(id: number) {
    const parking = await this.findOne(id);
    const parkingRemoved = await this.parkingsRepository.remove(parking);
    return parkingRemoved;
  }
}
