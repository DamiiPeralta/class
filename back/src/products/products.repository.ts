import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./products.entity";
import { ProductDto } from "./products.dto";

@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
    ){}

    async getProducts(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    async getProductById(id: string): Promise<Product> {
        const product = await this.productsRepository.findOne({ where: { id } });
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return product;
    }

    async createProduct(productDto: ProductDto): Promise<Product> {
        const newProduct = this.productsRepository.create(productDto);
        return this.productsRepository.save(newProduct);
    }

    async updateProduct(id: string, productDto: ProductDto): Promise<Product> {
        const product = await this.getProductById(id);
        this.productsRepository.merge(product, productDto);
        return this.productsRepository.save(product);
    }

    async deleteProduct(id: string): Promise<void> {
        const product = await this.getProductById(id);
        await this.productsRepository.remove(product);
    }
}
