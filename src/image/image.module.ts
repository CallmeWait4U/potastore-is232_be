import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [],
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
