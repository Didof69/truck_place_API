import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Parking } from 'src/parkings/entities/parking.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    likedParking:Parking[]
}
