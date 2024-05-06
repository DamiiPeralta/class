// order.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from "src/users/users.entity";
import { OrderDetails } from "src/orders/orderDetails.entity";


@Entity({ name: "orders" })
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(() => OrderDetails, orderDetail => orderDetail.order)
    orderDetails: OrderDetails;

    @Column({ type: "date" })
    date: Date;

    @ManyToOne(() => User, user => user.orders)
    @JoinColumn({name: "user_id"})
    user: User;
}