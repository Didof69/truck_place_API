import { Controller, Get, Post, Body, Param, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { OpinionsService } from './opinions.service';
import { CreateOpinionDto } from './dto/create-opinion.dto';
import { AuthGuard } from '@nestjs/passport';
import { Opinion } from './entities/opinion.entity';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('opinions')
export class OpinionsController {
  constructor(private readonly opinionsService: OpinionsService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body() createOpinionDto: CreateOpinionDto,
    @GetUser() user: User,
  ): Promise<Opinion> {
    return this.opinionsService.create(createOpinionDto, user.user_id);
  }

  @Get()
  findAll() {
    return this.opinionsService.findAll();
  }

  @Get('parking/:id')
  findOpinionsParkingId(@Param('id') id: string) {
    return this.opinionsService.findOpinionsByParkingId(+id);
  }
}
