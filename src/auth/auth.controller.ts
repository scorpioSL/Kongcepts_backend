import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LoginDto } from 'src/shared/dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { catchError } from 'src/shared/error-handling/catch-error';
import { EmployeeResponseDto } from 'src/shared/dto/employee-response.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
        // do nothing
    }

    @Post('login')
    public async login(@Res() res: Response, @Body() body: LoginDto): Promise<Response> {
        try {
            const jwt: string = await this.authService.login(body);
            return res.status(HttpStatus.OK).json({ jwt: jwt });
        } catch (error) {
            catchError(res, error);
        }
    }

    @Post('logout')
    public async logout(@Res() res: Response): Promise<Response> {
        return res.status(HttpStatus.OK).send();
    }

    @UseGuards(JwtAuthGuard)
    @Get('whoami')
    public async whoAmI(@Req() req: Request, @Res() res: Response): Promise<Response> {
        try {
            const employee: EmployeeResponseDto = await this.authService.whoAmI(req);
            return res.status(HttpStatus.OK).json(employee);
        } catch (error) {
            catchError(res, error);
        }
    }
}
