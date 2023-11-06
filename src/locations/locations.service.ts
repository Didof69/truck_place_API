import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location) private locationsRepository: Repository<Location>,
  ) { }
  
    findAll() {
    return this.locationsRepository.find();
    }
  
  async findLocationByInseeCode(insee_code:string) {
    const found = await this.locationsRepository.findOneBy({ insee_code })
    return found
    }
}
