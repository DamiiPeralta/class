import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { Order } from "src/orders/orders.entity"; 

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50 })
    name: string;

    @Column({ unique: true, length: 50 })
    email: string;

    @Column({ length: 20 })
    password: string;

    @Column({ type: "int" })
    phone: number;

    @Column({ length: 50 })
    country: string;

    @Column({ type: "text" })
    address: string;

    @Column({ length: 50 })
    city: string;

    @OneToMany(() => Order, order => order.user)
    @JoinColumn({name:"order_id"})
    orders: Order[];
}
