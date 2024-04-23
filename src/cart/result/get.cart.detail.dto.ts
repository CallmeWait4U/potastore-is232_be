import { Expose } from 'class-transformer';

export class ProductCartItem {
  @Expose()
  productId: string;

  @Expose()
  name: string;

  @Expose()
  totalPrice: number;

  @Expose()
  quantity: number;

  @Expose()
  price: number;
}

export class GetCartDetailResult {
  @Expose()
  id: string;

  @Expose()
  total: string;

  @Expose()
  productCarts: ProductCartItem[];
}
