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
    const requestTs =
      request["timestamp"] != undefined
        ? new Date(request["timestamp"]).toISOString()
        : "unknown request timestamp";
    return `OK (${requestTs})`;
  }

  @Get("ko")
  ko() {
    throw new InternalServerErrorException();
  }
}
