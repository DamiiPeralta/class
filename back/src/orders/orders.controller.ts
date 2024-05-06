import { Controller, Post, Body, Param, Get } from "@nestjs/common";
import { OrdersService } from "./orders.service"
import { Order } from "./orders.entity";
import { Product } from "src/products/products.entity";
import { CreateOrderDto } from "./createOrderDto.Dto";

@Controller("orders")
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    createOrder(@Body() createOrderDto:CreateOrderDto): Promise<Order> {
        return this.ordersService.addOrder(createOrderDto);
    }

    @Get()
    getOrders():Promise<Order[]>{
        return this.ordersService.getOrders();
    }

    @Get(":id")
    getOrderById(@Param("id") id: string): Promise<Order> {
        return this.ordersService.getOrder(id);
    }
}
