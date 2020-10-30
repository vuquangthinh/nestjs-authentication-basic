import { ApiTags } from "@nestjs/swagger";
import { Controller, Post, Body, BadRequestException } from "@nestjs/common";
import { TokenService, InjectTokenService, Identity } from "@agiletech.vn/nestjs-authentication";
import { BasicService } from "../services/basic.service";
import { InjectBasicService } from "../injects";
import { LoginDto } from "../dtos";

@ApiTags("Authentication")
@Controller("auth")
export class LoginController {
  constructor(
    @InjectBasicService() protected basicService: BasicService<LoginDto>,
    @InjectTokenService() protected tokenService: TokenService
  ) {}

  @Post("basic")
  async login(
    @Body()
    data: LoginDto
  ) {
    try {
      const user = await this.basicService.getIdentity(data);

      if (!user) {
        throw new BadRequestException("invalid credential");
      }

      const tokens = await this.tokenService.generateTokens(user);
      return tokens;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
