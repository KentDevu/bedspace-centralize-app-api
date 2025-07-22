/**
 * DTO for user registration
 */
export class RegisterUserDto {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'landlord';

  constructor(name: string, email: string, password: string, role: 'user' | 'landlord') {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
} 