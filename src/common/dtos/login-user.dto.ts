/**
 * DTO for user login
 */
export class LoginUserDto {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
} 