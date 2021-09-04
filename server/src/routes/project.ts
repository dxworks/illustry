import { Router } from 'express';
import * as projectMiddleware from '../middleware/project';

const router = Router();

router.post('/add/git/project', projectMiddleware.createGitProject)

router.get('/projects', projectMiddleware.query)

router.get('/project/:projectName', projectMiddleware.findOne)
 

const multer = require('multer')
const storage = multer.diskStorage({destination: null})
var upload = multer({storage: storage, limits: { fileSize: 10* 1024 * 1024 } })
router.post('/project', upload.single('File'), projectMiddleware.createIllustryProject)

var uploadEmpty = multer()
router.put('/project/:projectName', uploadEmpty.none(),projectMiddleware.updateProject)

router.delete('/project/:projectName', projectMiddleware.deleteProject )


export default router