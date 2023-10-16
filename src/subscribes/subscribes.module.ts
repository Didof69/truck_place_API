import { Module } from '@nestjs/common';
import { SubscribesService } from './subscribes.service';
import { SubscribesController } from './subscribes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscribe } from './entities/subscribe.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscribe]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [SubscribesController],
  providers: [SubscribesService],
})
export class SubscribesModule {}
