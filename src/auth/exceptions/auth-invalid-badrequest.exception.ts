import { BadRequestException } from "@nestjs/common";

export class InvalidBadRequestException extends BadRequestException {
    private email: string;
    constructor(email: string, msg: string) {
        super()
        this.message = msg;
        this.email = email;
    }
}