import { Router } from 'express';
import * as createProjectMiddleware from '../middleware/projectCreation';
 
const router = Router();

router.post('/create/upload',createProjectMiddleware.createProject)
//router.get('/projects/all', createProjectMiddleware.getAllProjectsIds)
export default router 