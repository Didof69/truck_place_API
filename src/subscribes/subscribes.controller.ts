import { Controller, Get, Post, Body, Param, UseGuards, Delete, UnauthorizedException } from '@nestjs/common';
import { SubscribesService } from './subscribes.service';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscribesService.findOne(+id);
  }

  @Get('parking/:id')
  findSubscribedUsersByParkingId(@Param('id') id: string) {
    return this.subscribesService.findSubscribedUsersByParkingId(+id);
  }

  @Get()
  @UseGuards(AuthGuard())
  findSubscribedParkingsByUserId(@GetUser() user: User) {
    return this.subscribesService.findSubscribedPakingsByUserId(user.user_id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async remove(@Param('id') id: string, @GetUser() user: User) {
    const subscribeToRemove = await this.findOne(id);
    if (subscribeToRemove.user_id !== user.user_id) {
      if (!user.admin) {
        throw new UnauthorizedException('Droits insuffisant pour supprimer');
      }
    }
    return this.subscribesService.remove(+id);
  }
}
