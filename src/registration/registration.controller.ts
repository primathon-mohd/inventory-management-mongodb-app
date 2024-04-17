import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { SignInDto, SignUpDto } from './dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
// import { SignUpDto } from './dto/signup.dto';
// import { SignInDto } from './dto/signin.dto';

@ApiTags('Authorization')
@ApiResponse({
  status: 400,
  description: 'Bad Request',
})
@Controller('registration')
export class RegistrationController {
  constructor(private registrationService: RegistrationService) {}

  @ApiBody({ type: SignUpDto })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created for signed up.',
  })
  @Post('signup')
  async signup(@Body() signupDto: SignUpDto) {
    console.log('Inside signup method $$$$$$$$$$$$$$$$$$$$$$');
    return await this.registrationService.signUp(signupDto);
  }

  @ApiBody({ type: SignInDto })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created for signed up.',
  })
  @Post('signin')
  async signin(@Body() signInDto: SignInDto) {
    console.log('Inside signin method --------------');
    return await this.registrationService.signIn(signInDto);
  }
}
