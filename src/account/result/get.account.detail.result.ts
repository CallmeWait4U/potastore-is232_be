import { Expose } from 'class-transformer';

export class GetAccountDetailResult {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  code: string; // User Id

  @Expose()
  email: string;

  @Expose()
  gender: string;

  @Expose()
  dayOfBirth: Date;

  @Expose()
  phoneNumber: string;

  @Expose()
  address: string;
}
