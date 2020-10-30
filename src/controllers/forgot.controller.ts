import { Post, Controller, Body, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ForgotTokenDto, ForgotPasswordDto } from "../dtos";
import { ForgotConfirmationDto } from "../dtos/forgot-confirmation.dto";
import { InjectForgotService } from "../injects";
import { ForgotService } from "../services";

@ApiTags("Authentication")
@Controller("auth")
export class ForgotController {
  constructor(
    @InjectForgotService()
    private forgotService: ForgotService
  ) {}

  @Post("forgot-password")
  async requestChange(@Body() data: ForgotPasswordDto) {
    const transaction = await this.forgotService.requestChangePassword(data);
    return transaction;
  }

  @Post("confirm-password")
  @UsePipes(new ValidationPipe({ groups: ["confirmation"] }))
  async confirmChange(@Body() data: ForgotConfirmationDto) {
    await this.forgotService.confirmChangePassword(data);
  }
}
