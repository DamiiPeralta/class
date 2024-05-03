import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Category } from "src/categories/categories.entity";
import { CategoriesRepository } from "src/categories/categories.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Product]), 
             TypeOrmModule.forFeature([Category])
],
    providers:[ProductsService, ProductsRepository,  CategoriesRepository],
    controllers:[ProductsController]
})
export class ProductsModule{}