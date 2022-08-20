import { Router } from "express";
import * as illustrationAPI from "../api/illustrations";

const router = Router();

const multer = require("multer");
const storage = multer.diskStorage({ destination: null });
var upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 },
});
var finalupload = upload.fields([{ name: "File", maxCount: 10 }]);
router.post(
  "/api/project/:projectName/illustration",
  finalupload,
  illustrationAPI.addOrUpdate
);

router.get(
  "/api/project/:projectName/illustration",
  illustrationAPI.browse
);

router.get(
  "/api/project/:projectName/illustration/:illustrationName",
  illustrationAPI.findOne
);

router.delete(
  "/api/project/:projectName/illustration/:illustrationName/:type",
  illustrationAPI._delete
);

router.get(
  "/api/project/:projectName/illustration/type/:illustrationType",
  illustrationAPI.browseSameType
);

router.post(
  "/api/external/illustration",
  illustrationAPI.addExtern
);
router.post(
  "/api/external/oneillustration",
  illustrationAPI.findOneExtern
);
router.put(
  "/api/external/illustration",
  illustrationAPI.updateExtern
);

router.delete(
  "/api/external/illustration",
  illustrationAPI.deleteExtern
);

router.post(
  "/api/all/external/illustration",
  illustrationAPI.browseExtern
);

router.post(
  "/api/illustrationofsametype/external/illustration",
  illustrationAPI.browseSameTypeExtern
);
export default router;
