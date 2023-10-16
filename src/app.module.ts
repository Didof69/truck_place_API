import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ParkingsModule } from './parkings/parkings.module';
import { Parking } from './parkings/entities/parking.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { ServicesModule } from './services/services.module';
import { Service } from './services/entities/service.entity';
import { OpinionsModule } from './opinions/opinions.module';
import { Opinion } from './opinions/entities/opinion.entity';
import { SubscribesModule } from './subscribes/subscribes.module';
import { Subscribe } from './subscribes/entities/subscribe.entity';
import { LocationsModule } from './locations/locations.module';
import { Location } from './locations/entities/location.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: [`.env`] }),
    ParkingsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Parking, User, Service, Opinion, Subscribe, Location],
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
    ServicesModule,
    OpinionsModule,
    SubscribesModule,
    LocationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
