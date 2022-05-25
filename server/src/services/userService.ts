import User from '../db/models/user';
import { UserData, UserInterface } from '../core/models/userModel';
import { NextFunction } from 'express';

export default class UserService {
    public async getAll(next: NextFunction): Promise<UserData[] | void> {
        try {
            const users = await User.find();
            const userData = users.map(
                (user) =>
                    new UserData(
                        user._id,
                        user.email,
                    ),
            );
            return userData;
        } catch (e) {
            return next(e);
        }
    }
    public async getUserById(
        id: string,
        next: NextFunction,
    ): Promise<UserData> {
        try {
            const user = await User.findById(id);
            return new UserData(user._id, user.email);
        } catch (e) {
            next(e);
        }
    }

    public async getUserByEmail(
        email: string,
        next: NextFunction,
    ): Promise<UserInterface> {
        try {
            const user = await User.findOne({ email });
            return user;
        } catch (e) {
            next(e);
        }
    }

    public async addNewUser(
        body: {
            email: string;
            password: string;
        },
        next: NextFunction,
    ): Promise<UserData> {
        try {
            const user = new User({
                email: body.email,
            });
            user.setPassword(body.password);
            await user.save();
            return new UserData(user._id, user.email);
        } catch (e) {
            next(e);
        }
    }
}
