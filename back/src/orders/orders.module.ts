import { Module }   from   "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./orders.entity";
import { OrderRepository } from "./orders.repository";
import { OrderDetails } from "./orderDetails.entity.";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { UsersService } from "src/users/users.service";
import { ProductsService } from "src/products/products.service";
import { ProductsRepository } from "src/products/products.repository";
import { UsersRepository } from "src/users/users.repository";

@Module({
    imports: [TypeOrmModule.forFeature([Order])],
    providers: [
        OrderRepository,
        OrderDetails,
        OrdersService,
        UsersService,
        ProductsService,
        ProductsRepository,
        UsersRepository
        
    ],
    controllers: [OrdersController]
})
export class OrderModule  {}