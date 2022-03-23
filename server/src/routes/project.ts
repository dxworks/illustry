import { Router } from 'express';
import * as projectMiddleware from '../middleware/project';

const router = Router();

router.post('/api/external/project', projectMiddleware.createProjectfromExtern)
router.delete('/api/external/project', projectMiddleware.deleteProjectfromExtern)
router.put('/api/external/project', projectMiddleware.updateProjectfromEtern)

router.get('/api/projects', projectMiddleware.query)
router.get('/api/project/:projectName', projectMiddleware.findOne)


const multer = require('multer')
const storage = multer.diskStorage({ destination: null })
var upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } })
router.post('/api/project', upload.array('File', 10), projectMiddleware.createIllustryProject)

var uploadEmpty = multer()
router.put('/api/project/:projectName', uploadEmpty.none(), projectMiddleware.updateProject)

router.delete('/api/project/:projectName', projectMiddleware.deleteProject)


export default router