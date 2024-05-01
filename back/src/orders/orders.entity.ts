// order.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "src/users/users.entity";
import { OrderDetails } from "src/orders/orderDetails.entity.";

@Entity({ name: "orders" })
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(() => OrderDetails, orderDetail => orderDetail.order)
    @JoinColumn()
    orderDetails: OrderDetails;

    @Column({ type: "date" })
    date: Date;

    @OneToOne(() => User, user => user.orders)
    user: User;
}
