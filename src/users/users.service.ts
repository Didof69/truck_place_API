import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, Timestamp } from 'typeorm';
import { Parking } from 'src/parkings/entities/parking.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return `This action returns all users`;
  }

  async findOne(pseudo: string) {
    const found = await this.usersRepository.findOneBy({ pseudo });
    if (!found) {
      throw new NotFoundException(`User ${pseudo} not found`);
    }
    return found;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
