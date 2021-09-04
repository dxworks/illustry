import { Router } from 'express';
import * as illustrationMiddleware from '../middleware/illustrations';

const router = Router();

const multer = require('multer')
const storage = multer.diskStorage({destination: null})
var upload = multer({storage: storage, limits: { fileSize: 10* 1024 * 1024 } })
router.post('/project/:id/illustration',upload.single('File'), illustrationMiddleware.addIllustration)

router.put('/project/:prjid/illustration/:id', upload.single('File'), illustrationMiddleware.updateIllustration)

router.get('/project/:prjid/illustration', illustrationMiddleware.findAllIllustration)

router.get('/project/:prjid/illustration/:id', illustrationMiddleware.findOneIllustration)

router.delete('/project/:prjid/illustration/:id', illustrationMiddleware.deteleIllustration)
export default router