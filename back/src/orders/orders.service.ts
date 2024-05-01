// src/orders/orders.service.ts

import { Injectable } from "@nestjs/common";
import { OrderRepository } from "./orders.repository";
import { Order } from "./orders.entity";
import { Product } from "src/products/products.entity";

@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository: OrderRepository) {}

    async addOrder(userId: string, products: Product[]): Promise<Order> {
        return this.ordersRepository.addOrder(userId, products);
    }

    async getOrder(id: string): Promise<Order> {
        return this.ordersRepository.getOrder(id);
    }
}
