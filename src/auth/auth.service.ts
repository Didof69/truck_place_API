import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(createAuthDto: CreateAuthDto) {
    const { pseudo, user_name, firstname, email, password, admin } =
      createAuthDto;

    // hashage du mot de passe
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // création d'une entité user
    const user = this.usersRepository.create({
      pseudo,
      user_name,
      firstname,
      email,
      password: hashedPassword,
      admin: false,
    });

    try {
      // enregistrement de l'entité user
      const createdUser = await this.usersRepository.save(user);
      delete createdUser.password;
      return createdUser;
    } catch (error) {
      // gestion des erreurs
      if (error.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async login(loginDto: LoginDto) {
	const { pseudo, password } = loginDto;
  const user = await this.usersRepository.findOneBy({ pseudo });

  if (user && (await bcrypt.compare(password, user.password))) {
    const payload = { pseudo };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  } else {
    throw new UnauthorizedException('Ces identifiants ne sont pas reconnus.');
  }
  }
}
