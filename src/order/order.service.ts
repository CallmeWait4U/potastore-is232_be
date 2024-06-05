import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { StatusOrder } from 'libs/status.order';
import { User } from 'libs/user';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrderDTO } from './dto/create.order.dto';
import { GetOrderDetailResult } from './result/get.order.detail.result';
import { GetOrderListResult } from './result/get.order.list.result';

@Injectable()
export class OrderService {
  @Inject()
  private readonly prisma: PrismaService;

  async getOrderList(take: number, skip: number, user: User) {
    const condition = [];
    if (user.role === 'Customer') {
      const customerId = (
        await this.prisma.account.findUnique({ where: { id: user.id } })
      ).customerId;
      condition.push({ customerId });
    }
    const [data, total] = await Promise.all([
      this.prisma.order.findMany({
        skip: Number(skip),
        take: Number(take),
        where: { AND: condition },
        include: { productOrders: true, customer: true },
      }),
      this.prisma.order.count({ where: { AND: condition } }),
    ]);
    return {
      items: data.map((i) =>
        plainToClass(GetOrderListResult, {
          ...i,
          numItems: i.productOrders.length,
          customerName: i.customer.name,
          orderDate: i.createdDate,
        }),
      ),
      total,
    };
  }

  async getOrderDetail(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        productOrders: { include: { product: true } },
        customer: true,
      },
    });
    return plainToClass(GetOrderDetailResult, {
      ...order,
      customerName: order.customer.name,
      phoneNumber: order.customer.phoneNumber,
      orderDate: order.createdDate,
      productOrders: order.productOrders.map((product) => ({
        name: product.product.name,
        quantity: product.quantity,
        price: product.product.price,
        total: product.product.price * product.quantity,
      })),
    });
  }

  async create(order: CreateOrderDTO) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { customerId, ...dataOrder } = order;
    const orderId = uuidv4().toString();
    const productOrders = order.productOrders.map((product) => {
      const productOrderId = uuidv4().toString();
      return {
        id: productOrderId,
        quantity: product.quantity,
        productId: product.productId,
      };
    });
    const account = await this.prisma.account.findUnique({
      where: { id: order.customerId },
    });
    if (account.role === 'Customer') {
      await this.prisma.order.create({
        data: {
          ...dataOrder,
          id: orderId,
          createdDate: new Date(),
          status: StatusOrder.NOTDELIVER,
          customer: { connect: { id: account.customerId } },
          productOrders: { createMany: { data: productOrders } },
        },
      });
    } else {
      await this.prisma.order.create({
        data: {
          ...dataOrder,
          id: orderId,
          createdDate: new Date(),
          status: StatusOrder.NOTDELIVER,
          productOrders: { createMany: { data: productOrders } },
        },
      });
    }
  }

  async update(id: string, status: StatusOrder) {
    await this.prisma.order.update({ where: { id }, data: { status } });
  }

  async delete(id: string) {
    await this.prisma.order.delete({ where: { id } });
  }
}
