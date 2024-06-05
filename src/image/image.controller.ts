import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PredictImageDTO } from './dto/predict.image.dto';
import { ImageService } from './image.service';

@ApiTags('image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('images'))
  async predict(
    @Body() body: PredictImageDTO,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const image = images[0];
    return await this.imageService.predict(image);
    // return [{ filename: image.filename }];
  }
}
