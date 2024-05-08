import { Controller, Get, InternalServerErrorException, Logger } from "@nestjs/common";
import { CategoriesServices } from "./categories.service";

@Controller('categories')
export class CategoriesControllers {
    private readonly logger = new Logger(CategoriesControllers.name);

    constructor(private readonly categoriesServices: CategoriesServices) {}

    @Get('seeder')
    async addCategories() {
        try {
            await this.categoriesServices.addCategories();
        } catch (error) {
            this.logger.error(`Error al agregar categorías: ${error.message}`);
            throw new InternalServerErrorException('Error interno al agregar categorías');
        }
    }

    @Get()
    async getCategories() {
        try {
            return await this.categoriesServices.getCategories();
        } catch (error) {
            this.logger.error(`Error al obtener categorías: ${error.message}`);
            throw new InternalServerErrorException('Error interno al obtener categorías');
        }
    }
}
