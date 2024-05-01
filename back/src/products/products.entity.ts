import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Category } from "src/categories/categories.entity";
import { OrderDetails } from "src/orders/orderDetails.entity.";

@Entity({ name: "products" })
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50 })
    name: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price: number;

    @Column({ type: "integer" })
    stock: number;

    @Column({ nullable: true })
    imgUrl: string;

    @ManyToOne(() => Category, category => category.products)
    category: Category;

    @ManyToMany(() => OrderDetails, orderDetails => orderDetails.products)
    @JoinTable()
    orderDetails: OrderDetails[];
}
