import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
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

  async findOne(id: number) {
    const found = await this.subscribesRepository.findOneBy({
      subscribe_id: id,
    });
    if (!found) {
      throw new NotFoundException(`Susbcription with the id ${id} not found`);
    }
    return found;
  }

  async findSubscribedUsersByParkingId(parking_id: number) {
    const found = await this.subscribesRepository.find({
      where: { parking_id },
    });

    if (!found) {
      throw new NotFoundException(`There is not subscribed`);
    }
    const usersTab = [];
    found.forEach((user) => {
      if (user.unsubscribe_date > new Date()) {
        usersTab.push(user);
      }
    });
    return usersTab;
  }

  async findSubscribedPakingsByUserId(user_id: number) {
    const found = await this.subscribesRepository.find({
      where: { user_id },
    });

    if (!found) {
      throw new NotFoundException(`There is not subscribed`);
    }

    const parkingsTab = [];

    found.forEach((parking) => {
      if (parking.unsubscribe_date > new Date()) {
        parkingsTab.push(parking);
      }
    });
    return parkingsTab;
  }

  async remove(id: number) {
    const subscribe = await this.findOne(id);
    const subscribeRemoved = await this.subscribesRepository.remove(subscribe);
    return subscribeRemoved;
  }
}
