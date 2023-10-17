import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SubscribesService } from './subscribes.service';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { UpdateSubscribeDto } from './dto/update-subscribe.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Subscribe } from './entities/subscribe.entity';

@Controller('subscribes')
export class SubscribesController {
  constructor(private readonly subscribesService: SubscribesService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body() createSubscribeDto: CreateSubscribeDto,
    @GetUser() user: User,
  ): Promise<Subscribe> {
    return this.subscribesService.create(createSubscribeDto, user.user_id);
  }

  @Get('parking/:id')
  findSubscribedUsersByParkingId(@Param('id') id: string) {
    return this.subscribesService.findSubscribedUsersByParkingId(+id);
  }
}
