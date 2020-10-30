import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ForgotTokenDto {
  @ApiProperty()
  @IsNotEmpty({
    groups: ["confirmation", "response"],
  })
  transactionCode?: string;

  @ApiProperty()
  @IsNotEmpty({
    groups: ["confirmation"],
  })
  code?: string;
}
