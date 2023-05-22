export interface User {
  username: string;
  password: string;
  roles: string[];
}

export type UserWithoutPassord = Omit<User, "password">;
