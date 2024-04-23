import { Expose } from 'class-transformer';

export class GetProductListForCustomerResult {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  price: string;

  @Expose()
  image: string;

  @Expose()
  quantity: number;

  @Expose()
  ratingAvg: number;
}
