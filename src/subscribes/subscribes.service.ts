import { Injectable, NotFoundException } from '@nestjs/common';
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
  
  async findSubscribedUsersByParkingId(parking_id: number) {
    const found = await this.subscribesRepository.find({
      where: { parking_id },
    });

    if (!found) {
      throw new NotFoundException(`There is not subscribed`);
    }
    const usersTab = [];
    for (let i = 0; i < found.length; i++) {
      if (found[i].unsubscribe_date > new Date()) {
        usersTab.push(found[i].user_id);
      }
    }
    return usersTab;
  }
}
