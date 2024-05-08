import { Controller, Post, Body, Param, Get, NotFoundException, InternalServerErrorException, Logger } from "@nestjs/common";
import { OrdersService } from "./orders.service"
import { Order } from "./orders.entity";
import { CreateOrderDto } from "./createOrderDto.Dto";

@Controller("orders")
export class OrdersController {
    private readonly logger = new Logger(OrdersController.name);

    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    async createOrder(@Body() createOrderDto:CreateOrderDto): Promise<Order> {
        try {
            return await this.ordersService.addOrder(createOrderDto);
        } catch (error) {
            this.logger.error(`Error al crear la orden: ${error.message}`);
            throw new InternalServerErrorException('Error interno al crear la orden');
        }
    }

    @Get()
    async getOrders(): Promise<Order[]> {
        try {
            return await this.ordersService.getOrders();
        } catch (error) {
            this.logger.error(`Error al obtener las órdenes: ${error.message}`);
            throw new InternalServerErrorException('Error interno al obtener las órdenes');
        }
    }

    @Get(":id")
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
