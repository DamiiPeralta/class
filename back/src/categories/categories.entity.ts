import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Product } from "src/products/products.entity";

@Entity({ name: "categories" })
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50 })
    name: string;

    @OneToOne(() => Product, product => product.category)
    products: Product;
}
