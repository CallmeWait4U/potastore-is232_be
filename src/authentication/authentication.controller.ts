import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'libs/getuser.decorator';
import { User } from 'libs/user';
import { AuthenticationService } from './authentication.service';
import { SignInDTO } from './dto/sign.in.dto';
import { SignUpDTO } from './dto/sign.up.dto';

@ApiTags('authentication')
@Controller('')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-up')
  async signUp(@Body() body: SignUpDTO) {
    return await this.authenticationService.signUp(
      body.name,
      body.email,
      body.password,
    );
  }

  @Post('sign-in')
  async signIn(@Body() body: SignInDTO) {
    return await this.authenticationService.signIn(
      body.username,
      body.password,
    );
  }

  @Post('sign-out')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async signOut(@GetUser() user: User) {
    await this.authenticationService.signOut(user);
  }
}
