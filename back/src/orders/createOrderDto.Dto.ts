import { IsArray, IsNotEmpty, IsString, IsUUID, ArrayMinSize } from "class-validator";
import { Product } from "src/products/products.entity";

export class CreateOrderDto{
    @IsNotEmpty()
    @IsUUID()
    @IsString()
    userId:string
    @IsNotEmpty()
    @IsArray({ message: 'Se espera que products sea un array' })
    @ArrayMinSize(1, { message: 'Se espera que products contenga al menos un elemento' })   
    products:Partial<Product[]>
}