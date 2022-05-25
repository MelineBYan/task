import { Router } from 'express';
import UrlController from '../controller/urlController';
import passport from 'passport';

const route = Router();
const urlController = new UrlController();
route.get(
    '/available/:url',
    passport.authenticate('jwt', { session: false }),
    urlController.getAllAvailableUrls,
);

export default route;