import { Expose } from 'class-transformer';

export class GetAccountListResult {
  @Expose()
  id: string;

  @Expose()
  role: string;

  @Expose()
  code: string; // User Id

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;
}
