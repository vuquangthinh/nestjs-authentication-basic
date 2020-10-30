import { ApiProperty } from "@nestjs/swagger";
import { ForgotTokenDto } from "./forgot-token.dto";

export class ForgotConfirmationDto extends ForgotTokenDto {
  @ApiProperty()
  password!: string;
}
