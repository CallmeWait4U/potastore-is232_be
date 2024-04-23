import { Expose } from 'class-transformer';

export class GetProductDetailResult {
  @Expose()
  id: string;

  @Expose()
  code: string;

  @Expose()
  type: string;

  @Expose()
  quantity: number;

  @Expose()
  price: number;

  @Expose()
  description: string;

  @Expose()
  image: string;
}
