import User from '../services/userService';
import Jwt from '../services/jwtService';
import { ApiResponse } from '../core/models/responseModel';
import { UserData } from '../core/models/userModel';
import type { NextFunction, Request, Response } from 'express';

const userService = new User();
const jwtService = new Jwt();

export default class UserController {
    public async signIn(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const { email, password } = req.body;
            const user = await userService.getUserByEmail(email, next);
            if (!user) {
                return res
                    .status(404)
                    .send(ApiResponse.generateNotFoundErrorResponse('User'));
            }
            if (!user.validPassword(password)) {
                return res.send(
                    ApiResponse.generateLoginInvalidErrorResponse(),
                );
            }

            const result = new UserData(
                user.id,
                user.email,
                jwtService.generateToken(user.email, user.id),
            );
            return res
                .status(200)
                .send(
                    new ApiResponse(200, result, 'User successfully logged in'),
                );
        } catch (error) {
            return res
                .status(500)
                .send(ApiResponse.generateDefaultErrorResponse());
        }
    }

    public async signUp(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res
                    .status(400)
                    .send(ApiResponse.generateBadRequestErrorResponse());
            }

            const possibleUser = await userService.getUserByEmail(email, next);
            if (possibleUser) {
                return res.send(new ApiResponse(409, null, 'EMAIL_EXISTS'));
            }
            const user = await userService.addNewUser(req.body, next);
            if (user) {
                user.token = jwtService.generateToken(
                    user.email,
                    user.id,
                );
                return res
                    .status(200)
                    .send(
                        new ApiResponse(200, user, 'User successfully saved'),
                    );
            }
        } catch (error) {
            return res
                .status(500)
                .send(ApiResponse.generateDefaultErrorResponse());
        }
    }

    public async getProfile(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const {id} = req.user as UserData;
            const user = await userService.getUserById(id, next);
            if (!user) {
                res.status(404).send(
                    ApiResponse.generateNotFoundErrorResponse('User'),
                );
            }
        
            res.status(200).send(new ApiResponse(200, user, 'User data'));
        } catch (error) {
            console.log(error, "error");
            return res
                .status(500)
                .send(ApiResponse.generateDefaultErrorResponse());
        }
    }
    public async getUsers(
        _req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const users = await userService.getAll(next);
            if (!users) {
                return res
                    .status(404)
                    .send(ApiResponse.generateNotFoundErrorResponse('Users'));
            }
            res.status(200).send(new ApiResponse(200, users, 'Users data'));
        } catch (error) {
            return res
                .status(500)
                .send(ApiResponse.generateDefaultErrorResponse());
        }
    }
}
