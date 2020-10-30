import { ForgotPasswordDto } from "../dtos";
import { ForgotConfirmationDto } from "../dtos/forgot-confirmation.dto";
import { ForgotTokenDto } from "../dtos/forgot-token.dto";

export interface ForgotService {
  requestChangePassword(
    forgot: ForgotPasswordDto
  ): Promise<Pick<ForgotTokenDto, "transactionCode">>;
  confirmChangePassword(tokens: ForgotConfirmationDto): Promise<void>;
}
