import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { Order } from 'src/orders/orders.entity';
import { Product } from 'src/products/products.entity';

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @OneToOne(() => Order, order => order.orderDetails)
  @JoinColumn({name:"order_id"})
  order: Order;

  @ManyToMany(() => Product)
  @JoinTable({
    name:"orderdetails_products",
    joinColumn:{
      name:"product_id",
      referencedColumnName:"id"
    },
    inverseJoinColumn:{
      name:"orderdetail_id",
      referencedColumnName:"id"
    }
  })
  products: Product[];
}
