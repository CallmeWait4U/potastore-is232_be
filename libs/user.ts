import { Expose } from 'class-transformer';

export class User {
  @Expose()
  id: string;
  @Expose()
  username: string;
  @Expose()
  role: 'Admin' | 'Customer';
}
