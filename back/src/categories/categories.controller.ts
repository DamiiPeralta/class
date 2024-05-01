import { Controller, Get, } from "@nestjs/common";
import { CategoriesServices } from "./categories.service";

@Controller('categories')
export class CategoriesControllers{
    constructor (private CategoriesServices:CategoriesServices){}

    @Get('seeder')
    addCategories(){
        return this.CategoriesServices.addCategories()
    }

    @Get()
    getCategories(){
        return this.CategoriesServices.getCategories()
    }
}