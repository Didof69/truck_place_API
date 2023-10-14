import { Injectable } from '@nestjs/common';
import { Service } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ServicesService {
   constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
   ) { }
  
  findAll() {
    return this.servicesRepository.find();
  }
}
