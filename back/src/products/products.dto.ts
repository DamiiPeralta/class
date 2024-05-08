export class ProductDto {
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly stock: number;
    readonly imgUrl: string;
    readonly category: string;
    // Puedes agregar más propiedades según sea necesario

    constructor(partial: Partial<ProductDto>) {
        Object.assign(this, partial);
    }
}
