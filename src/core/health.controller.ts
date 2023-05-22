import {
  Controller,
  Get,
  InternalServerErrorException,
  Req,
} from "@nestjs/common";
import { Public } from "src/auth/auth.decorator";

@Public()
@Controller("health")
export class HealthController {
  @Get("ok")
  ok(@Req() request: Request) {
    return `OK (${request["timestamp"]})`;
  }

  @Get("ko")
  ko() {
    throw new InternalServerErrorException();
  }
}
