import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ParkingsService } from './parkings.service';
import { ParkingsController } from './parkings.controller';
import { Parking } from './entities/parking.entity';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    TypeOrmModule.forFeature([Parking]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ParkingsController],
  providers: [ParkingsService],
})
export class ParkingsModule {}
