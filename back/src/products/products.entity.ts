import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn, OneToMany } from "typeorm";
import { Category } from "src/categories/categories.entity";
import { OrderDetails } from "src/orders/orderDetails.entity";

export class ColumnNumericTransformer {
    to(data: number): number {
      return data;
    }
    from(data: string): number {
      return parseFloat(data);
    }
  }

@Entity({
    name: 'products',
  })
  export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
    name: string;
  
    @Column({ type: 'text', nullable: false })
    description: string;
  
    @Column({
      type: 'decimal',
      precision: 10,
      scale: 2,
      nullable: false,
      transformer: new ColumnNumericTransformer(),
    })
    price: number;
  
    @Column({ type: 'int', nullable: false })
    stock: number;
  
    @Column({
      type: 'text',
      nullable: true,
      default:
        'https://www.netambulo.com/storage/2011/12/404-not-found-gatito.jpg',
    })
    imgUrl: string;
  
    //* Products N:1 Categories
    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'category_id' })
    category: Category;
  
    //*Products N:N OrderDetails
    @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
    orderDetails: OrderDetails[];
  }