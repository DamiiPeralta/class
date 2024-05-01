import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Order } from 'src/orders/orders.entity';
import { Product } from 'src/products/products.entity';

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Order, order => order.orderDetails)
  order: Order;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}
