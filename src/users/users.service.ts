import { Injectable } from "@nestjs/common";
import { User, UserWithoutPassord } from "./users.interface";

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      username: "john",
      password: "password",
      roles: ["user"],
    },
    {
      username: "maria",
      password: "password",
      roles: ["user", "admin"],
    },
  ];

  find(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }

  findAll(): UserWithoutPassord[] {
    return this.users.map((user) => {
      delete user.password;
      return user as UserWithoutPassord;
    });
  }
}
