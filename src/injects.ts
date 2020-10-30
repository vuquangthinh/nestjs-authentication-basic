import { Inject } from "@nestjs/common";
import { BASIC_SERVICE, FORGOT_SERVICE } from "./constants";

export const InjectBasicService = () => Inject(BASIC_SERVICE);
export const InjectForgotService = () => Inject(FORGOT_SERVICE);
