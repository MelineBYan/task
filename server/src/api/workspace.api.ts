import { Router } from 'express';
import WorkspaceController from '../controller/workspaceController';
import passport from 'passport';

const route = Router();
const workspaceController = new WorkspaceController();
console.log("in router module");

route.get('/:id',  passport.authenticate('jwt', { session: false }), workspaceController.getWorkspace);
route.get('/',  passport.authenticate('jwt', { session: false }), workspaceController.getAll);
route.post('/', passport.authenticate('jwt', { session: false }), workspaceController.create);
route.put('/:id',  passport.authenticate('jwt', { session: false }), workspaceController.update);
route.delete('/:id', passport.authenticate('jwt', { session: false }), workspaceController.deleteWorkspace);

export default route;