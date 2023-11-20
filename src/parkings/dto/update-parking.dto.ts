import { PartialType } from '@nestjs/mapped-types';
import { CreateParkingDto } from './create-parking.dto';
import { User } from 'src/users/entities/user.entity';

export class UpdateParkingDto extends PartialType(CreateParkingDto) {
  users: User[];
}
