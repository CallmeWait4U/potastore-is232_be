import { Expose } from 'class-transformer';
import { StatusOrder } from 'libs/status.order';

export class GetOrderDetailResult {
  @Expose()
  id: string;

  @Expose()
  customerName: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  orderCode: string;

  @Expose()
  status: StatusOrder;

  @Expose()
  orderDate: Date;

  @Expose()
  productOrders: {
    name: string;
    quantity: string;
    price: number;
    total: number;
  };

  @Expose()
  total: number;
}
