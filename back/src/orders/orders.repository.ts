import { Repository } from 'typeorm';
import { Order } from './orders.entity';
import { Injectable} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { OrderDetails } from 'src/orders/orderDetails.entity.';
import { Product } from '../products/products.entity';
import { ProductsService } from '../products/products.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderRepository {
    constructor(
        private readonly usersService: UsersService,
        private readonly productsService: ProductsService,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    async addOrder(userId: string, products: Product[]): Promise<Order> {
        // Buscar al usuario por su ID
        const user = await this.usersService.getUserById(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Crear una nueva orden
        const order = new Order();
        order.user = user;
        order.date = new Date();

        // Crear el detalle de la orden
        const orderDetails = new OrderDetails();
        orderDetails.price = 0; // Inicializar el precio en 0

        // Agregar los productos al detalle de la orden y calcular el precio total
        for (const product of products) {
            // Buscar el producto por su ID en la base de datos
            const productInDB = await this.productsService.getProductById(product.id);
            if (productInDB && productInDB.stock > 0) {
                // Restar una unidad del stock del producto utilizando el servicio de productos
                productInDB.stock -= 1;

                await this.productsService.updateProduct(product.id,productInDB);

                // Sumar el precio del producto al precio total de la orden
                orderDetails.price += productInDB.price;

                // Agregar el producto al detalle de la orden
                orderDetails.products.push(productInDB);
            }
        }

        // Asignar el detalle de la orden a la orden
        order.orderDetails = orderDetails;

        // Guardar la orden en la base de datos
        await this.orderRepository.save(order);

        // Devolver la orden creada
        return order;
    }

    async getOrder(id: string): Promise<Order> {
        // Buscar la orden por su ID incluyendo las relaciones
        const order: Order = await this.orderRepository.findOne({
            where: { id: id },
            relations: ['user', 'orderDetails'], // Utilizamos el nombre de la relación
          });
        return order;
    }
}
