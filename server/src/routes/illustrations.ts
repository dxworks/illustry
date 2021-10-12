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

router.get('/project/:projectName/illustration/type/:illustrationType',illustrationMiddleware.getAllIllustriesOfTheSameType)

router.post('/add/external/illustration',illustrationMiddleware.addIllustrationFromOtherSource)

router.put('/update/external/illustration', illustrationMiddleware.updateIllustrationFromOtherSource)

router.delete('/delete/external/illustration',illustrationMiddleware.deleteIllustrationFromExternalSource)

router.get('/all/external/illustration', illustrationMiddleware.findAllIllustrationFromOtherSource)

router.get('/oneillustration/external/illustration', illustrationMiddleware.findOneIllustrationFromOtherSource)

router.get('/illustrationofsametype/external/illustration', illustrationMiddleware.getAllIllustriesOfTheSameTypeFromOtherSource)
export default router