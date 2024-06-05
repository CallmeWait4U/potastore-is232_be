import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { User } from 'libs/user';
import { jwtConfig } from './jwt/jwt.config';

@Injectable()
export class AuthenticationService {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly jwtService: JwtService;

  async signIn(username: string, password: string): Promise<string> {
    const account = await this.prisma.account.findUnique({
      where: { username },
    });
    if (!account) {
      throw new HttpException('Wrong Username', HttpStatus.BAD_REQUEST);
    }
    const match = await bcrypt.compare(password, account.password);
    if (!match) {
      throw new HttpException('Wrong Password', HttpStatus.BAD_REQUEST);
    }
    const userParam: User = plainToClass(User, account, {
      excludeExtraneousValues: true,
    });
    console.log(userParam);
    const accessToken = await this.jwtService.signAsync(
      { ...userParam },
      {
        secret: jwtConfig.access,
        expiresIn: jwtConfig.expiresIn.access,
      },
    );
    await this.prisma.account.update({
      where: { id: account.id },
      data: { accessToken },
    });
    return accessToken;
  }

  async signOut(user: User) {
    await this.prisma.account.update({
      where: { id: user.id },
      data: { accessToken: null },
    });
  }
}
