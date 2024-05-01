import { Controller, Post, Body, Param, Get } from "@nestjs/common";
import { OrdersService } from "./orders.service"
import { Order } from "./orders.entity";
import { Product } from "src/products/products.entity";

@Controller("orders")
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    createOrder(@Body() userId: string, products: Product[]): Promise<Order> {
        return this.ordersService.addOrder(userId, products);
    }

    @Get(":id")
    getOrderById(@Param("id") id: string): Promise<Order> {
        return this.ordersService.getOrder(id);
    }
}
