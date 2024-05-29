import { Controller, Post, Body, Param, Get, NotFoundException, InternalServerErrorException, Logger, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service"
import { Order } from "./orders.entity";
import { CreateOrderDto } from "./createOrderDto.Dto";
import { AuthGuard } from "src/auth/auth.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/auth/roles.enum";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "src/auth/roles.guard";

@Controller("orders")
@ApiTags("Order")
export class OrdersController {
    private readonly logger = new Logger(OrdersController.name);

    constructor(private readonly ordersService: OrdersService) {}
    @ApiBearerAuth()
    @Post()
    @UseGuards(AuthGuard)
    async createOrder(@Body() createOrderDto:CreateOrderDto): Promise<Order> {
        try {
            return await this.ordersService.addOrder(createOrderDto);
        } catch (error) {
            this.logger.error(`Error al crear la orden: ${error.message}`);
            throw new InternalServerErrorException('Error interno al crear la orden');
        }
    }
    @ApiBearerAuth()
    @UseGuards(AuthGuard,RolesGuard)
    @Get()
    @Roles(Role.Admin, Role.SuperAdmin)
    async getOrders(): Promise<Order[]> {
        try {
            return await this.ordersService.getOrders();
        } catch (error) {
            this.logger.error(`Error al obtener las órdenes: ${error.message}`);
            throw new InternalServerErrorException('Error interno al obtener las órdenes');
        }
    }
    @ApiBearerAuth()
    @Get(":id")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin, Role.SuperAdmin)
    async getOrderById(@Param("id") id: string): Promise<Order> {
        try {
            const order = await this.ordersService.getOrder(id);
            if (!order) {
                throw new NotFoundException(`Orden con ID '${id}' no encontrada`);
            }
            return order;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error; // Propagar NotFoundException sin modificar
            } else {
                this.logger.error(`Error al obtener la orden con ID '${id}': ${error.message}`);
                throw new InternalServerErrorException('Error interno al obtener la orden');
            }
        }
    }
}
