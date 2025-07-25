import { IsEmail, IsString, IsObject, IsNotEmpty } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  to: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  /**
   * The name of the template file (e.g., 'welcome') without the extension.
   */
  @IsString()
  @IsNotEmpty()
  template: string;

  /**
   * The data to be passed into the template.
   * e.g., { name: 'Jane', url: '...' }
   */
  @IsObject()
  context: Record<string, any>;
}
