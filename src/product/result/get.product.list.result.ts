import { Expose } from 'class-transformer';

export class GetProductListResult {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  type: string;

  @Expose()
  price: number;

  @Expose()
  description: string;

  @Expose()
  quantity: number;
}
