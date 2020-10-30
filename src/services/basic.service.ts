import { Identity } from "@agiletech.vn/nestjs-authentication";
import { LoginDto } from "../dtos";

export interface BasicService<T extends LoginDto = LoginDto, I = Identity> {
  /**
   * get identity from username / password
   * @param info
   */
  getIdentity(info: T): Promise<I>;

  encryptPassword(password: string): Promise<string>;
  validatePassword(password: string, encryptPassword: string): Promise<boolean>;

  updatePassword(userId: string, password: string): Promise<void>;
}
