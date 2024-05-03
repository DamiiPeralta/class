import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { Product } from "src/products/products.entity";

@Entity({ name: "categories" })
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    name: string;

    @OneToMany(() => Product, product => product.category)
    @JoinColumn()
    products: Product[];
}
