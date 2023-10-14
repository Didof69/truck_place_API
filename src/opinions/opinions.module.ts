import { Module } from '@nestjs/common';
import { OpinionsService } from './opinions.service';
import { OpinionsController } from './opinions.controller';
import { Opinion } from './entities/opinion.entity';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Opinion]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [OpinionsController],
  providers: [OpinionsService],
})
export class OpinionsModule {}
