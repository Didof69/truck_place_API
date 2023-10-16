import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
