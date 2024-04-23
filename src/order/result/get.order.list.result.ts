import { Expose } from 'class-transformer';

export class GetOrderListResult {
  @Expose()
  id: string;

  @Expose()
  orderCode: string;

  @Expose()
  status: string;

  @Expose()
  numItems: number;

  @Expose()
  customerName: string;

  @Expose()
  orderDate: Date;

  @Expose()
  total: number;
}
