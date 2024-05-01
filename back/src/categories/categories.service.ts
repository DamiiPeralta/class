import { Injectable } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";

@Injectable()
export class CategoriesServices{
    constructor (private categoriesRepository:CategoriesRepository){}
    
    addCategories(){
        return this.categoriesRepository.addCategories();
    }

    getCategories(){
        return this.categoriesRepository.getCategories();
    }
}