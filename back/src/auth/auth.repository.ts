import { Injectable } from "@nestjs/common";
import { User } from "../users/user.interface";

@Injectable()
export class AuthRepository {
    private readonly users: User[] = [
        // Aquí irían los datos de usuarios
        {
            id: 1,
            email: "user1@example.com",
            name: "John Doe",
            password: "password1",
            address: "123 Main Street",
            phone: "123-456-7890",
            country: "United States",
            city: "New York"
        },
        {
            id: 2,
            email: "user2@example.com",
            name: "Alice Smith",
            password: "password2",
            address: "456 Elm Street",
            phone: "456-789-0123",
            country: "Canada",
            city: "Toronto"
        },
        {
            id: 3,
            email: "user3@example.com",
            name: "Bob Johnson",
            password: "password3",
            address: "789 Oak Street",
            phone: "789-012-3456",
            country: "United Kingdom",
            city: "London"
        },
        {
            id: 4,
            email: "user4@example.com",
            name: "Emma Brown",
            password: "password4",
            address: "987 Pine Street",
            phone: "987-654-3210"
        },
        {
            id: 5,
            email: "user5@example.com",
            name: "Michael Lee",
            password: "password5",
            address: "654 Birch Street",
            phone: "654-321-0987"
        }
    ];

    async checkUserExistsByEmail(email: string): Promise<boolean> {
        // Verifica si existe un usuario con el correo electrónico proporcionado
        const user = this.users.find(user => user.email === email);
        return !!user;
    }

    async checkPasswordMatches(email: string, password: string): Promise<boolean> {
        // Verifica si la contraseña coincide con la registrada para el usuario con el correo electrónico proporcionado
        const user = this.users.find(user => user.email === email);
        return user && user.password === password;
    }
}