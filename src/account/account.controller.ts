import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAccountDTO } from './dto/create.account.dto';
import { DeleteAccountDTO } from './dto/delete.account.dto';
import { GenerateResetCodeDTO } from './dto/generate.reset.code.dto';
import { GetAccountDetailDTO } from './dto/get.account.detail.dto';
import { GetAccountListDTO } from './dto/get.account.list.dto';
import { ResetPasswordDTO } from './dto/reset.password.dto';
import { UpdateAccountDTO } from './dto/update.account.dto';

@ApiTags('account')
@Controller('account')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('')
  async getAccountList(@Query() query: GetAccountListDTO) {
    return await this.accountService.getAccountList(query.take, query.skip);
  }

  @Get('/detail')
  async getAccountDetail(@Query() query: GetAccountDetailDTO) {
    return await this.accountService.getAccountDetail(query.id);
  }

  @Post('')
  async createAccount(@Body() body: CreateAccountDTO) {
    await this.accountService.create(body);
  }

  @Put('/update')
  async updateAccount(@Body() body: UpdateAccountDTO) {
    await this.accountService.update(body);
  }

  @Delete('/delete')
  async deleteAccount(@Body() body: DeleteAccountDTO) {
    await this.accountService.delete([body.id]);
  }

  @Post('/sendPasswordResetCode')
  async generateResetCode(@Body() body: GenerateResetCodeDTO) {
    return await this.accountService.generateResetCode(body.username);
  }

  @Post('/resetPassword')
  async resetPassword(@Body() body: ResetPasswordDTO) {
    return await this.accountService.resetPassword(body);
  }
}
