import { Inject, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { PrismaService } from 'libs/database.module';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDTO } from './dto/create.product.dto';
import { GetProductListForCustomerDTO } from './dto/get.product.list.for.customer.dto';
import { UpdateProductDTO } from './dto/update.product.dto';
import { GetProductDetailResult } from './result/get.product.detail.result';
import { GetProductListForCustomerResult } from './result/get.product.list.for.customer.result';
import { GetProductListResult } from './result/get.product.list.result';

@Injectable()
export class ProductService {
  @Inject()
  private readonly prisma: PrismaService;

  async getProductList(take: number, skip: number, categoryId?: string) {
    const condition = categoryId ? [{ categoryId }] : [];
    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        take: Number(take),
        skip: Number(skip),
        where: { AND: condition },
        include: { category: true },
      }),
      this.prisma.product.count(),
    ]);
    return {
      items: data.map((i) =>
        plainToClass(
          GetProductListResult,
          { ...i, type: i.category.name },
          { excludeExtraneousValues: true },
        ),
      ),
      total,
    };
  }

  async GetProductListForCustomer(query: GetProductListForCustomerDTO) {
    const conditions = [];
    for (const [prop, item] of Object.entries(query)) {
      if (prop === 'searchWord') {
        conditions.push({ name: { contains: item } });
      }
      if (prop === 'categoryId') {
        conditions.push({ categoryId: item });
      }
      if (prop === 'price') {
        conditions.push({ price: Number(item) });
      }
      if (prop === 'unit') {
        conditions.push({ unit: item });
      }
    }
    const data = await this.prisma.product.findMany({
      where: { AND: conditions },
      include: { comments: true },
    });
    return {
      items: data.map((i) => {
        let ratingAvg = 0;
        i.comments.map((comment) => (ratingAvg = ratingAvg + comment.rating));
        ratingAvg = ratingAvg / i.comments.length;
        return plainToClass(
          GetProductListForCustomerResult,
          { ...i, ratingAvg },
          { excludeExtraneousValues: true },
        );
      }),
    };
  }

  async getProductDetail(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    return plainToClass(GetProductDetailResult, {
      ...product,
      type: product.category.name,
    });
  }

  async create(product: CreateProductDTO) {
    const productId = uuidv4().toString();
    const { typeId, ...dataProduct } = product;
    await this.prisma.product.create({
      data: {
        ...dataProduct,
        id: productId,
        createdDate: new Date(),
        category: { connect: { id: typeId } },
      },
    });
  }

  async update(product: UpdateProductDTO) {
    await this.prisma.product.update({
      where: { id: product.id },
      data: { ...product, category: { connect: { id: product.typeId } } },
    });
  }

  async delete(id: string) {
    await this.prisma.product.delete({ where: { id } });
  }
}
