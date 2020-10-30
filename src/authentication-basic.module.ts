import {
  Module,
  DynamicModule,
  ModuleMetadata,
  Type,
  ClassProvider,
  FactoryProvider,
  ValueProvider,
  ExistingProvider,
} from "@nestjs/common";
import { AuthenticationModule } from "@vuquangthinh/nestjs-authentication";
import { BasicService } from "./services/basic.service";
import * as Controller from "./controllers";

import { BASIC_SERVICE, FORGOT_SERVICE } from "./constants";
import { ForgotService } from "./services";

type Provider<T> = ClassProvider<T> | ValueProvider<T> | FactoryProvider<T> | ExistingProvider<T>;
type ServiceProvider<T> = Omit<Provider<T>, "provide">;

export interface AuthenticationConfig {
  BasicService: Partial<ServiceProvider<BasicService>>;
  ForgotService: Partial<ServiceProvider<ForgotService>>;
  LoginController: Type<Controller.LoginController>;
}

@Module({})
export class AuthenticationBasicModule {
  static forRoot({
    exports,
    imports,
    providers,
    controllers,
    BasicService,
    ForgotService,
    LoginController,
  }: Partial<AuthenticationConfig & ModuleMetadata>): DynamicModule {
    if (!BasicService) {
      throw new Error("invalid basic service");
    }

    return {
      global: true,
      module: AuthenticationModule,
      providers: [
        {
          ...BasicService,
          provide: BASIC_SERVICE,
        } as any,
        ...(providers || []),
      ].filter((s) => !!s) as ModuleMetadata["providers"],

      imports,
      exports: [BASIC_SERVICE, ...(exports || [])].filter((s) => !!s) as ModuleMetadata["exports"],

      controllers: [LoginController || Controller.LoginController, ...(controllers || [])],
    };
  }
}
