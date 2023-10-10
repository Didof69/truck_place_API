import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ParkingsService } from './parkings.service';
import { ParkingsController } from './parkings.controller';
import { Parking } from './entities/parking.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Parking])],
  controllers: [ParkingsController],
  providers: [ParkingsService],
})
export class ParkingsModule {}
