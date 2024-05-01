import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductsRepository } from "./products.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./products.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers:[ProductsService, ProductsRepository],
    controllers:[ProductsController]
})
export class ProductsModule{}