import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/database.module';
import { v4 as uuidv4 } from 'uuid';
import { CreateCommentDTO } from './dto/create.comment.dto';

@Injectable()
export class CommentService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(comment: CreateCommentDTO) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { productId, customerId, ...dataComment } = comment;
    const commentId = uuidv4().toString();
    await this.prisma.comment.create({
      data: {
        ...dataComment,
        id: commentId,
        product: { connect: { id: comment.productId } },
        customer: { connect: { id: comment.customerId } },
      },
    });
  }
}
