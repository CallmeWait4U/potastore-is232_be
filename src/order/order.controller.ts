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
import { GetUser } from 'libs/getuser.decorator';
import { User } from 'libs/user';
import { CreateOrderDTO } from './dto/create.order.dto';
import { DeleteOrderDTO } from './dto/delete.order.dto';
import { GetOrderDetailDTO } from './dto/get.order.detail.dto';
import { GetOrderListDTO } from './dto/get.order.list.dto';
import { UpdateStatusOrderDTO } from './dto/update.status.order.dto';
import { OrderService } from './order.service';

@ApiTags('order')
@Controller('order')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('')
  async getOrderList(@Query() query: GetOrderListDTO, @GetUser() user: User) {
    return await this.orderService.getOrderList(query.take, query.skip, user);
  }

  @Get('/detail')
  async getOrderDetail(@Query() query: GetOrderDetailDTO) {
    return await this.orderService.getOrderDetail(query.id);
  }

  @Post('')
  async createOrder(@Body() body: CreateOrderDTO) {
    await this.orderService.create(body);
  }

  @Put('/update/status')
  async updateStatusOrder(@Body() body: UpdateStatusOrderDTO) {
    await this.orderService.update(body.id, body.status);
  }

  @Delete('/delete')
  async deleteOrder(@Body() body: DeleteOrderDTO) {
    await this.orderService.delete(body.id);
  }
}
