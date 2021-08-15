import { UnauthorizedException } from "@nestjs/common";

export class AuthUnauthorizedException extends UnauthorizedException {
    constructor(message: string) {
        super();
        this.message = message;
    }
}