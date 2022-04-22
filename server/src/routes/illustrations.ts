import { Router } from "express";
import * as illustrationMiddleware from "../middleware/illustrations";

const router = Router();

const multer = require("multer");
const storage = multer.diskStorage({ destination: null });
var upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});
var finalupload = upload.fields([{ name: "File", maxCount: 10 }]);
router.post(
  "/api/project/:projectName/illustration",
  finalupload,
  illustrationMiddleware.addOrUpdateIllustrations
);

// router.put('/api/project/:projectName/illustration/:illustrationName', upload.single('File'), illustrationMiddleware.updateIllustration)

// router.put('/api/project/:projectName/illustration/multiple', upload.array('File', 10), illustrationMiddleware.updateManyIllustration)

router.get(
  "/api/project/:projectName/illustration",
  illustrationMiddleware.findAllIllustration
);

router.get(
  "/api/project/:projectName/illustration/:illustrationName",
  illustrationMiddleware.findOneIllustration
);

router.delete(
  "/api/project/:projectName/illustration/:illustrationName",
  illustrationMiddleware.deteleIllustration
);

router.get(
  "/api/project/:projectName/illustration/type/:illustrationType",
  illustrationMiddleware.getAllIllustriesOfTheSameType
);

router.post(
  "/api/external/illustration",
  illustrationMiddleware.addIllustrationFromOtherSource
);
router.post(
  "/api/external/oneillustration",
  illustrationMiddleware.findOneIllustrationFromOtherSource
);
router.put(
  "/api/external/illustration",
  illustrationMiddleware.updateIllustrationFromOtherSource
);

router.delete(
  "/api/external/illustration",
  illustrationMiddleware.deleteIllustrationFromExternalSource
);

router.post(
  "/api/all/external/illustration",
  illustrationMiddleware.findAllIllustrationFromOtherSource
);

router.post(
  "/api/illustrationofsametype/external/illustration",
  illustrationMiddleware.getAllIllustriesOfTheSameTypeFromOtherSource
);
export default router;
