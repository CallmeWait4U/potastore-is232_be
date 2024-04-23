import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'libs/getuser.decorator';
import { User } from 'libs/user';
import { CartService } from './cart.service';
import { AddProductCartDTO } from './dto/add.product.cart.dto';

@ApiTags('cart')
@Controller('cart')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/detail')
  async getDetail(@GetUser() user: User) {
    if (user.role === 'Admin')
      throw new HttpException(
        'Chỉ khách hàng mới có giỏ hàng',
        HttpStatus.BAD_REQUEST,
      );
  }

  @Post('addProduct')
  async addProduct(@Body() body: AddProductCartDTO, @GetUser() user: User) {
    if (user.role === 'Admin')
      throw new HttpException(
        'Chỉ khách hàng mới có giỏ hàng',
        HttpStatus.BAD_REQUEST,
      );
    await this.cartService.addProductCart(body, user.id);
  }
}
