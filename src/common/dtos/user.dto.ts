/**
 * Data Transfer Object for User
 */
export class UserDto {
  id: number;
  name: string;
  email: string;
  role: string;

  constructor(id: number, name: string, email: string, role: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }
} 