import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('admin')
  @UseGuards(AuthGuard())
  findAll(@GetUser() user: User) {
       if (!user.admin) {
         throw new ForbiddenException(
           `Vous ne detenez pas les droits nécessaires.`,
         );
       }
    return this.usersService.findAll();
  }

  @Get() //pour que l'utilisateur puisse accéder à son profil
  findOne(@GetUser() user: User) {
    return this.usersService.findOne(user.pseudo);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Body() updateUserDto: UpdateUserDto, @GetUser() user: User) {
    return this.usersService.update(user.pseudo, updateUserDto);
  }

  @Delete(':pseudo')
  remove(@Param('pseudo') pseudo: string, @GetUser() user: User) {
    if (pseudo !== user.pseudo) {
      if (!user.admin) {
        throw new ForbiddenException(
          `Vous ne detenez pas les droits supprimer ce profil.`,
        );
      }
    }
    return this.usersService.remove(pseudo, user);
  }
}
