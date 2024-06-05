import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductDTO } from './dto/create.product.dto';
import { DeleteProductDTO } from './dto/delete.product.dto';
import { GetProductDetailDTO } from './dto/get.product.detail..dto';
import { GetProductListDTO } from './dto/get.product.list.dto';
import { GetProductListForCustomerDTO } from './dto/get.product.list.for.customer.dto';
import { UpdateProductDTO } from './dto/update.product.dto';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('product')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  async getProductList(@Query() query: GetProductListDTO) {
    console.log(query.categoryId);
    return await this.productService.getProductList(
      query.take,
      query.skip,
      query.categoryId,
    );
  }

  @Get('/forCustomer')
  async getProductListForCustomer(
    @Query() query: GetProductListForCustomerDTO,
  ) {
    return await this.productService.GetProductListForCustomer(query);
  }

  @Get('/detail')
  async getProductDetail(@Query() query: GetProductDetailDTO) {
    return await this.productService.getProductDetail(query.id);
  }

  @Post('')
  async createProduct(@Body() body: CreateProductDTO) {
    await this.productService.create(body);
  }

  @Put('/update')
  async updateProduct(@Body() body: UpdateProductDTO) {
    await this.productService.update(body);
  }

  @Delete('/delete')
  async deleteProduct(@Body() body: DeleteProductDTO) {
    await this.productService.delete(body.id);
  }
}
