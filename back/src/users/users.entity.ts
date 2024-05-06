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

    @Column({ type: "int" , nullable:true })
    phone: number;

    @Column({ length: 50, nullable: true})
    country: string;

    @Column({ type: "text", nullable: true})
    address: string;

    @Column({ length: 50 , nullable:true})
    city: string;

    @OneToMany(() => Order, order => order.user)
    @JoinColumn({name:"order_id"})
    orders: Order[];
}
