import { IsEmail, IsInt, IsNotEmpty , IsString, Length, Matches } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsString()
    @Length(3,80)
    name: string;
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,15}$/gm, {
        message:
          'Password must be between 8 and 15 characters long with 1 special character and capital character each',
      })
    password: string;
    @Length(3,80)
    address: string;
    @IsNotEmpty()
    @IsInt()
    phone: number;
    @IsString()
    @Length(3,20)
    country?: string;
    @IsString()
    @Length(3,20)
    city?: string;

    constructor(partial: Partial<CreateUserDto>) {
        Object.assign(this, partial);
    }
}
