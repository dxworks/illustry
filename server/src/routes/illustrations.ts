import { Router } from 'express';
import * as illustrationMiddleware from '../middleware/illustrations';

const router = Router();

const multer = require('multer')
const storage = multer.diskStorage({destination: null})
var upload = multer({storage: storage, limits: { fileSize: 10* 1024 * 1024 } })
router.post('/project/:projectName/illustration',upload.single('File'), illustrationMiddleware.addIllustration)

router.put('/project/:projectName/illustration/:illustrationName', upload.single('File'), illustrationMiddleware.updateIllustration)

router.get('/project/:projectName/illustration', illustrationMiddleware.findAllIllustration)

router.get('/project/:projectName/illustration/:illustrationName', illustrationMiddleware.findOneIllustration)

router.delete('/project/:projectName/illustration/:illustrationName', illustrationMiddleware.deteleIllustration)

router.post('/project/:projectName/illustration/git',illustrationMiddleware.addIllustrationFromOtherSource)
export default router