import { Controller, Get, Render, UseGuards } from "@nestjs/common";
import { Public, Roles } from "src/auth/auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { UsersService } from "./users.service";

@UseGuards(RolesGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles("admin")
  @Render("users")
  getAll() {
    const users = this.usersService.findAll();
    return { users };
  }
}
