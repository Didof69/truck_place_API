import { Injectable } from '@nestjs/common';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import { Subscribe } from './entities/subscribe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SubscribesService {
  constructor(
    @InjectRepository(Subscribe)
    private subscribesRepository: Repository<Subscribe>,
  ) {}

  async create(createSubscribeDto: CreateSubscribeDto, user_id: number) {
    const newSubscribe = this.subscribesRepository.create(createSubscribeDto);
    newSubscribe.user_id = user_id;
    const result = await this.subscribesRepository.save(newSubscribe);
    return result;
  }


  findAll() {
    return `This action returns all subscribes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscribe`;
  }

  update(id: number, updateSubscribeDto: UpdateSubscribeDto) {
    return `This action updates a #${id} subscribe`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscribe`;
  }
}
