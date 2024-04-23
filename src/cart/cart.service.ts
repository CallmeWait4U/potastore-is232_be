import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { v4 as uuidv4 } from 'uuid';
import { AddProductCartDTO } from './dto/add.product.cart.dto';
import {
  GetCartDetailResult,
  ProductCartItem,
} from './result/get.cart.detail.dto';

@Injectable()
export class CartService {
  @Inject()
  private readonly prisma: PrismaService;

  async getDetail(accountId: string): Promise<GetCartDetailResult> {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
    });
    const customer = await this.prisma.customer.findUnique({
      where: { id: account.customerId },
      include: { cart: true },
    });
    const cart = await this.prisma.cart.findUnique({
      where: { id: customer.cart[0].id },
      include: { productCarts: { include: { product: true } } },
    });
    return plainToClass(
      GetCartDetailResult,
      {
        ...cart,
        productCarts: cart.productCarts.map((product) =>
          plainToClass(
            ProductCartItem,
            {
              productId: product.productId,
              name: product.product.name,
              totalPrice: product.product.price * product.quantity,
              quantity: product.quantity,
              price: product.product.price,
            },
            { excludeExtraneousValues: true },
          ),
        ),
      },
      { excludeExtraneousValues: true },
    );
  }

  async addProductCart(productCart: AddProductCartDTO, accountId: string) {
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
    });
    const customer = await this.prisma.customer.findUnique({
      where: { id: account.customerId },
      include: { cart: true },
    });
    const cart = await this.prisma.cart.findUnique({
      where: { id: customer.cart[0].id },
      include: { productCarts: true },
    });
    const productId = cart.productCarts.filter(
      (i) => i.productId === productCart.productId,
    );
    let productCartUpdate: Prisma.ProductCartGetPayload<{
      include: { product: true };
    }>;
    if (productId.length === 0) {
      const productCartId = uuidv4().toString();
      productCartUpdate = await this.prisma.productCart.create({
        data: {
          id: productCartId,
          quantity: productCart.quantity,
          product: { connect: { id: productCart.productId } },
          cart: { connect: { id: cart.id } },
        },
        include: { product: true },
      });
    } else {
      productCartUpdate = await this.prisma.productCart.update({
        data: { quantity: productId[0].quantity + productCart.quantity },
        where: { id: productId[0].id },
        include: { product: true },
      });
    }
    await this.prisma.cart.update({
      data: {
        total:
          cart.total + productCartUpdate.product.price * productCart.quantity,
      },
      where: { id: cart.id },
    });
  }
}
