import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOpinionDto } from './dto/create-opinion.dto';
import { UpdateOpinionDto } from './dto/update-opinion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Opinion } from './entities/opinion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OpinionsService {
  constructor(
    @InjectRepository(Opinion)
    private opinionsRepository: Repository<Opinion>,
  ) {}

  async create(createOpinionDto: CreateOpinionDto, user_id: number) {
    const newOpinion = this.opinionsRepository.create(createOpinionDto);
    newOpinion.user_id = user_id;
    const result = await this.opinionsRepository.save(newOpinion);
    return result;
  }

  findAll() {
    return this.opinionsRepository.find();
  }

  async findOpinionsByParkingId(parking_id: number) {
    const found = await this.opinionsRepository.find({
      where: { parking_id },
    });

    if (!found) {
      throw new NotFoundException(`There is not subscribed`);
    }

    return found;
  }

  remove(id: number) {
    return `This action removes a #${id} opinion`;
  }
}
