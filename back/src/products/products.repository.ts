import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./products.entity";
import { ProductDto } from "./products.dto";
import * as data from "../utils/data.json";
import { Category } from "src/categories/categories.entity";


@Injectable()
export class ProductsRepository {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>
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
    //Agrega los productos hardcodeados en el data.json de la carpeta utils
    async addHardProducts(){
            
        try {
            const categories = await this.categoriesRepository.find();
            await Promise.all(data?.map(async (element) => {
                const category = categories.find(
                    (category) => category.name === element.category,
                  );
                console.log(category)
                if(category != null)
                    {
                        
                    }
                const product = new Product();
                product.name= element.name;
                product.description= element.description;
                product.price=element.price
                product.imgUrl=element.imgUrl;
                product.stock= element.stock;
                product.category= category

                delete product.id;
                console.log(product)
                await this.productsRepository
                
                    .createQueryBuilder()
                    .insert()
                    .into(Product)
                    .values(product)
                    .orUpdate(['description','price','stock','imgUrl'],['name'])
                    .execute();
            }));
            return 'Producto Agregado';
        } catch (error) {
            // Manejar el error aquí
            console.error('Error al agregar categorías:', error);
            throw error; // Puedes lanzar el error nuevamente si quieres que se maneje en otro lugar
        }
    }

}
