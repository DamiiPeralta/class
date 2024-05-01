import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./categories.entity";
import { CategoriesServices } from "./categories.service";
import { CategoriesRepository } from "./categories.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers:[CategoriesServices, CategoriesRepository],
    controllers:[]
})
export class ProductsModule{}