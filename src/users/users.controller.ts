import { Controller, Get, Render } from "@nestjs/common";
import { Public, Roles } from "src/auth/auth.decorator";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  //   @Roles("admin")
  @Render("users")
  getAll() {
    const users = this.usersService.findAll();
    return { users };
  }
}
