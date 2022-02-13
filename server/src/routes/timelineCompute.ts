import { Router } from 'express';
import * as timelinerMiddleware from '../middleware/timelinerCompute';

const router = Router();
const multer = require('multer')
var uploadEmpty = multer()
router.post('/api/timeliner/', uploadEmpty.none(), timelinerMiddleware.checkSearch)

export default router