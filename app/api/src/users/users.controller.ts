import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    createUserDto.password = hash;
    const usertest = await this.usersService.findUser(createUserDto.email);
    if (usertest) {
      throw new BadRequestException('Email alraedy Exists');
    } else {
      const user = await this.usersService.create(createUserDto);
      delete user.password;
      return user;
    }
  }
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      const { email, password } = loginDto;
      const user = await this.usersService.findUser(email);
      if (!user) {
        throw new BadRequestException('User Not Found');
      }
      console.log('Shit : ', user, password, user.password);
      if (!(await bcrypt.compare(password, user.password))) {
        throw new BadRequestException('Password Is Wrong');
      }
      const jwt = await this.jwtService.signAsync({ id: user.id });
      console.log('hhe', jwt);
      response.cookie('jwt', jwt, {
        domain: 'https://data-visualizer-gghew9ags-mohamedhadhoud1.vercel.app/',
        secure: true,
      });
      console.log('1', new Date());
      return {
        message: 'success',
      };
    } catch (error) {
      // Log the error or handle it appropriately
      console.error('Login error:', error);

      // Rethrow the error so NestJS can handle it
      throw new BadRequestException('Invalid login credentials');
    }
  }
  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      console.log('JWT Cookie:', cookie);
      if (!cookie) {
        throw new UnauthorizedException('JWT cookie is missing');
      }
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const id: number = data['id'];
      const user = await this.usersService.findOne(id);

      const { password, ...result } = user;
      console.log('result', result);
      return result;
    } catch (e) {
      console.error('JWT Verification Error:', e);
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success',
    };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body()
    body: { updateUserDto: UpdateUserDto; currentPassword: string | null },
  ) {
    const user = await this.usersService.findOne(+id);

    if (
      body.currentPassword &&
      !(await bcrypt.compare(body.currentPassword, user.password))
    ) {
      throw new BadRequestException('Current Password Is Wrong');
    }
    if (body.updateUserDto?.password) {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(body.updateUserDto.password, saltOrRounds);
      body.updateUserDto.password = hash;
    }
    this.usersService.update(+id, body.updateUserDto);
    return {
      message: 'success',
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
