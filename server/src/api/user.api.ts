import { Router } from 'express';
import UserController from '../controller/userController';
import validator from '../core/middleware/validator';
import passport from 'passport'

const route = Router();
const userController = new UserController();

route.post('/signin', userController.signIn);
route.post('/signup', validator('user-create'), userController.signUp);
route.get('/profile',  passport.authenticate('jwt', { session: false }), userController.getProfile);

export default route;