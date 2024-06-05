import { Module } from '@nestjs/common';
import { DatabaseModule } from 'libs/database.module';
import { FirebaseModule } from 'libs/fisebase.module';
import { AccountModule } from './account/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { CommentModule } from './comment/comment.module';
import { ImageModule } from './image/image.module';
import { OrderModule } from './order/order.module';
import { PredictResultModule } from './predict.result/predict.result.module';
import { ProductModule } from './product/product.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    DatabaseModule,
    FirebaseModule,
    AccountModule,
    AuthenticationModule,
    PredictResultModule,
    OrderModule,
    ProductModule,
    ImageModule,
    CommentModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
