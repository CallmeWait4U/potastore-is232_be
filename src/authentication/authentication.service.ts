import { faker } from '@faker-js/faker/locale/vi';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Customer, ShopOwner } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { User } from 'libs/user';
import { v4 as uuidv4 } from 'uuid';
import { jwtConfig } from './jwt/jwt.config';

@Injectable()
export class AuthenticationService {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly jwtService: JwtService;

  async signUp(name: string, email: string, password: string): Promise<string> {
    const accountId = uuidv4().toString();
    const userId = uuidv4().toString();
    const salt = await bcrypt.genSalt();
    const cartId = uuidv4().toString();
    await this.prisma.account.create({
      data: {
        id: accountId,
        username: email,
        password: await bcrypt.hash(password, salt),
        role: 'Customer',
        code: faker.string.numeric(5),
        customer: {
          create: {
            id: userId,
            name,
            email,
            cart: { create: { id: cartId, total: 0 } },
          },
        },
      },
    });
    return 'Tạo thành công';
  }

  async signIn(
    username: string,
    password: string,
  ): Promise<{
    accessToken: string;
    accountId: string;
    role: string;
    info: ShopOwner | Customer;
  }> {
    const account = await this.prisma.account.findUnique({
      where: { username },
      include: { shopOwner: true, customer: true },
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
    return {
      accessToken,
      accountId: account.id,
      role: account.role,
      info: account.role !== 'Customer' ? account.shopOwner : account.customer,
    };
  }

  async signOut(user: User) {
    await this.prisma.account.update({
      where: { id: user.id },
      data: { accessToken: null },
    });
  }
}
