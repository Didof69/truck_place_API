import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { Parking } from './entities/parking.entity';

@Injectable()
export class ParkingsService {

  constructor(
    @InjectRepository(Parking) private parkingsRepository: Repository<Parking>
  ) { }
  
  create(createParkingDto: CreateParkingDto) {
    return 'This action adds a new parking';
  }

  findAll() {
    return this.parkingsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} parking`;
  }

  update(id: number, updateParkingDto: UpdateParkingDto) {
    return `This action updates a #${id} parking`;
  }

  remove(id: number) {
    return `This action removes a #${id} parking`;
  }
}
