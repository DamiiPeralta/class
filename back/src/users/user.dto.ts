export class UserDto {
    readonly email: string;
    readonly name: string;
    readonly password: string;
    readonly address: string;
    readonly phone: number;
    readonly country?: string;
    readonly city?: string;

    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
    }
}
