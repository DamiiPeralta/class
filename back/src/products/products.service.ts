// products.service.ts
import { Injectable } from "@nestjs/common";
import { Product } from "./products.entity";
import { ProductDto } from "./products.dto";
import { ProductsRepository } from "./products.repository";

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) {}

    async getProducts(): Promise<Product[]> {
        return await this.productsRepository.getProducts();
    }

    async getProductById(id: string): Promise<Product> {
        return await this.productsRepository.getProductById(id);
    }

    async createProduct(productDto: ProductDto): Promise<Product> {
        return await this.productsRepository.createProduct(productDto);
    }

    async updateProduct(id: string, productDto: ProductDto): Promise<Product> {
        return await this.productsRepository.updateProduct(id, productDto);
    }

    async deleteProduct(id: string): Promise<void> {
        return await this.productsRepository.deleteProduct(id);
    }
}