import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ParkingsService } from './parkings.service';
import { CreateParkingDto } from './dto/create-parking.dto';
import { UpdateParkingDto } from './dto/update-parking.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { Parking } from './entities/parking.entity';

@Controller('parkings')
export class ParkingsController {
  constructor(private readonly parkingsService: ParkingsService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(
    @Body() createParkingDto: CreateParkingDto,
    @GetUser() user: User,
  ): Promise<Parking> {
    return this.parkingsService.create(createParkingDto, user.user_id);
  }

  @Get()
  findAll() {
    return this.parkingsService.findAll();
  }

  @Get('liked')
  @UseGuards(AuthGuard())
  findLikedParkingByUserPseudo(@GetUser() user: User) {
    return this.parkingsService.findLikedParkingByUserPseudo(user.pseudo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateParkingDto: UpdateParkingDto) {
    return this.parkingsService.update(+id, updateParkingDto);
  }

  @Post(':id')
  @UseGuards(AuthGuard())
  likeParking(@Param('id') id: string, @GetUser() user: User) {

    return this.parkingsService.likeParking(+id, user.pseudo);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async remove(@Param('id') id: string, @GetUser() user: User) {
     const parkingToRemove = await this.findOne(id);
    if (parkingToRemove.user_id !== user.user_id) {
      if (!user.admin) {
      throw new UnauthorizedException('Droits insuffisant pour supprimer');
    }
    }
    return this.parkingsService.remove(+id);
  }
}
