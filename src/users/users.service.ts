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
      throw new NotFoundException(`Utilisateur ${pseudo} not found`);
    }
    return found;
  }

//   async findSubscribedUsersByParkingId(parking_id: number): Promise<User[]> {
//     const today = new Date();

//     // Obtenez les composantes de la date
//     const year = today.getFullYear();
//     const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Notez que les mois sont basés sur zéro, donc ajoutez 1.
//     const day = today.getDate().toString().padStart(2, '0');
//     const hours = today.getHours().toString().padStart(2, '0');
//     const minutes = today.getMinutes().toString().padStart(2, '0');
//     const seconds = today.getSeconds().toString().padStart(2, '0');
//     const milliseconds = today.getMilliseconds().toString().padStart(3, '0');

//     // Concaténez les composantes dans le format souhaité
//     const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
// console.log(formattedDate);

//      return this.usersRepository
//       .createQueryBuilder('user')
//       .innerJoin('subscribe', 'subscribe', 'subscribe.user_id = user.user_id')
//       .innerJoin('parking', 'parking', 'parking.parking_id = subscribe.parking_id')
//       .where('parking.parking_id = :parking_id', { parking_id })
//       // .andWhere(`subscribe.unsubscribe_date > ${formattedDate}`)
//       .select('user.user_id')
//       .getMany()
//   }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
