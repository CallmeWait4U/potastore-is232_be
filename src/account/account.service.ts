import { faker } from '@faker-js/faker/locale/vi';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { v4 as uuidv4 } from 'uuid';
import { CreateAccountDTO } from './dto/create.account.dto';
import { ResetPasswordDTO } from './dto/reset.password.dto';
import { UpdateAccountDTO } from './dto/update.account.dto';
import { GetAccountDetailResult } from './result/get.account.detail.result';
import { GetAccountListResult } from './result/get.account.list.result';

@Injectable()
export class AccountService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(account: CreateAccountDTO) {
    const accountId = uuidv4().toString();
    const userId = uuidv4().toString();
    const salt = await bcrypt.genSalt();
    if (account.role === 'Admin') {
      await this.prisma.account.create({
        data: {
          id: accountId,
          username: account.email,
          password: await bcrypt.hash('123465', salt),
          role: 'Admin',
          code: faker.string.numeric(5),
          shopOwner: {
            create: { ...account, id: userId },
          },
        },
      });
    } else {
      const cartId = uuidv4().toString();
      await this.prisma.account.create({
        data: {
          id: accountId,
          username: account.email,
          password: await bcrypt.hash('123465', salt),
          role: 'Customer',
          code: faker.string.numeric(5),
          customer: {
            create: {
              ...account,
              id: userId,
              cart: { create: { id: cartId, total: 0 } },
            },
          },
        },
      });
    }
  }

  async update(account: UpdateAccountDTO) {
    const user = await this.prisma.account.findUnique({
      where: { id: account.id },
      include: {
        shopOwner: true,
        customer: true,
      },
    });

    if (user.role === 'Admin') {
      if (account.role && account.role !== 'Admin') {
        const admin = user.customer;
        for (const [prop, value] of Object.entries(admin)) {
          admin[prop] = account[prop] ? account[prop] : value;
        }
        await Promise.all([
          this.prisma.customer.delete({ where: { id: user.customer.id } }),
          this.prisma.account.update({
            where: { id: account.id },
            data: { ...account, shopOwner: { create: admin } },
          }),
        ]);
      } else {
        await this.prisma.account.update({
          where: { id: account.id },
          data: { ...account, shopOwner: { update: account } },
        });
      }
    } else {
      if (account.role && account.role !== 'Customer') {
        const customer = user.shopOwner;
        for (const [prop, value] of Object.entries(customer)) {
          customer[prop] = account[prop] ? account[prop] : value;
        }
        const cartId = uuidv4().toString();
        await Promise.all([
          this.prisma.shopOwner.delete({ where: { id: user.shopOwner.id } }),
          this.prisma.account.update({
            where: { id: account.id },
            data: {
              ...account,
              customer: {
                create: {
                  ...customer,
                  cart: { create: { id: cartId, total: 0 } },
                },
              },
            },
          }),
        ]);
      } else {
        await this.prisma.account.update({
          where: { id: account.id },
          data: { ...account, customer: { update: account } },
        });
      }
    }
  }

  async delete(ids: string[]) {
    await this.prisma.account.deleteMany({ where: { id: { in: ids } } });
  }

  async generateResetCode(username: string) {
    const user = await this.prisma.account.findUnique({ where: { username } });
    if (!user) {
      throw new HttpException('Wrong Username', HttpStatus.BAD_REQUEST);
    }
    return { id: user.id, resetCode: faker.string.numeric(8) };
  }

  async resetPassword({ id, password, passwordConfirm }: ResetPasswordDTO) {
    const account = await this.prisma.account.findUnique({
      where: { id },
    });
    if (!account) {
      throw new HttpException('Account do not exist', HttpStatus.BAD_REQUEST);
    }
    if (password !== passwordConfirm) {
      throw new HttpException('Wrong Password Confirm', HttpStatus.BAD_REQUEST);
    }
    const salt = await bcrypt.genSalt();
    await this.prisma.account.update({
      where: { id },
      data: {
        password: await bcrypt.hash(password, salt),
      },
    });
  }

  async getAccountList(take: number, skip: number) {
    const [data, total] = await Promise.all([
      this.prisma.account.findMany({
        take: Number(take),
        skip: Number(skip),
        include: {
          shopOwner: true,
          customer: true,
        },
      }),
      this.prisma.account.count(),
    ]);
    return {
      items: data.map((i) => {
        const filter = i.role === 'Admin' ? i.shopOwner : i.customer;
        return plainToClass(GetAccountListResult, { ...i, ...filter });
      }),
      total,
    };
  }

  async getAccountDetail(id: string) {
    const account = await this.prisma.account.findUnique({
      where: { id },
      include: { customer: true, shopOwner: true },
    });
    const filter =
      account.role === 'Admin' ? account.shopOwner : account.customer;
    return plainToClass(
      GetAccountDetailResult,
      { ...account, ...filter },
      { excludeExtraneousValues: true },
    );
  }
}
