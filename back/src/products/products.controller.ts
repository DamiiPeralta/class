import { UseGuards, Controller, Get, Post, Body, Param, Put, Delete, HttpStatus, HttpCode, BadRequestException } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./products.entity";
import { ProductDto } from "./products.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    
    @HttpCode(HttpStatus.OK)
    async getProducts(): Promise<Product[]> {
        return await this.productsService.getProducts();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getProductById(@Param('id') id: string): Promise<Product> {
        return await this.productsService.getProductById(id);
    }

    @Post()
    @UseGuards(AuthGuard) 
    @HttpCode(HttpStatus.CREATED)
    async createProduct(@Body() productDto: ProductDto): Promise<Product> {
        if (!productDto.name || !productDto.description || !productDto.price || !productDto.stock || !productDto.imgUrl) {
            throw new BadRequestException('Name, description, price, stock, and imgUrl are required');
        }
        return await this.productsService.createProduct(productDto);
    }

    @Put(':id')
    @UseGuards(AuthGuard) 
    @HttpCode(HttpStatus.OK)
    async updateProduct(@Param('id') id: string, @Body() productDto: ProductDto): Promise<Product> {
        if (!productDto.name && !productDto.description && !productDto.price && !productDto.stock && !productDto.imgUrl) {
            throw new BadRequestException('At least one field to update must be provided');
        }
        return await this.productsService.updateProduct(id, productDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard) 
    @HttpCode(HttpStatus.OK)
    async deleteProduct(@Param('id') id: string): Promise<void> {
        return await this.productsService.deleteProduct(id);
    }
}
