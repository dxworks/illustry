import { Router } from 'express';
import * as illustrationMiddleware from '../middleware/illustrations';

const router = Router();

const multer = require('multer')
const storage = multer.diskStorage({ destination: null })
var upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } })
router.post('/api/project/:projectName/illustration', upload.array('File', 10), illustrationMiddleware.addIllustration)

router.put('/api/project/:projectName/illustration/:illustrationName', upload.array('File', 10), illustrationMiddleware.updateIllustration)

router.get('/api/project/:projectName/illustration', illustrationMiddleware.findAllIllustration)

router.get('/api/project/:projectName/illustration/:illustrationName', illustrationMiddleware.findOneIllustration)

router.delete('/api/project/:projectName/illustration/:illustrationName', illustrationMiddleware.deteleIllustration)

router.get('/api/project/:projectName/illustration/type/:illustrationType', illustrationMiddleware.getAllIllustriesOfTheSameType)

router.post('/api/add/external/illustration', illustrationMiddleware.addIllustrationFromOtherSource)

router.put('/api/update/external/illustration', illustrationMiddleware.updateIllustrationFromOtherSource)

router.delete('/api/delete/external/illustration', illustrationMiddleware.deleteIllustrationFromExternalSource)

router.get('/api/all/external/illustration', illustrationMiddleware.findAllIllustrationFromOtherSource)

router.get('/api/oneillustration/external/illustration', illustrationMiddleware.findOneIllustrationFromOtherSource)

router.get('/api/illustrationofsametype/external/illustration', illustrationMiddleware.getAllIllustriesOfTheSameTypeFromOtherSource)
export default router