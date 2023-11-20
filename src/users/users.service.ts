import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
// import { ParkingsService } from 'src/parkings/parkings.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, // private parkingsService: ParkingsService,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(pseudo: string) {
    const found = await this.usersRepository.findOneBy({ pseudo });
    if (!found) {
      throw new NotFoundException(`User ${pseudo} not found`);
    }
    return found;
  }

  async update(pseudo: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(pseudo);
console.log(updateUserDto);

    //met à jour les parkings favoris
    if (user.likedParkings) {
      user.likedParkings = updateUserDto.likedParkings;
    }

    try {
      const updatedUser = this.usersRepository.merge(user, updateUserDto);

      const result = await this.usersRepository.save(updatedUser);
      console.log('je suis ici');
      
      return result;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('pseudo or email already exists');
      } else {
        console.log(error);
        
        throw new InternalServerErrorException();
      }
    }
  }

  async remove(pseudo: string, user: User) {
    const userToDelete = await this.findOne(pseudo);

    //supprime les données perso du user
    userToDelete.pseudo = `anonyme${userToDelete.user_id}`;
    userToDelete.email = `email${userToDelete.user_id}@email.fr`;
    userToDelete.firstname = 'anonyme';
    userToDelete.user_name = 'anonyme';
    userToDelete.password =
      '************************************************************';
    userToDelete.photo_id = null;
    userToDelete.is_delete = true;
    userToDelete.likedParkings = [];
    userToDelete.subscribes = [];

    console.log(userToDelete);
    
    // if (userToDelete.parkings) {
    //   userToDelete.parkings.forEach(parking => {
    //     if (!parking.public_view) {
    //       this.parkingsService.remove(parking.parking_id)
    //     }
    //   });
    // }

    const deletedUser = this.usersRepository.merge(user, userToDelete);
    const response = await this.usersRepository.save(deletedUser);
    return response;
  }
}
