export class RegisterDto {
  fullname: string;
  birthday: Date;
  password: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  phone_number: string;
}
