import { Router } from "express";
import * as projectAPI from "../api/project";

const router = Router();

router.post("/api/external/project", projectAPI.createExtern);
router.delete(
  "/api/external/project",
  projectAPI.deleteExtern
);
router.put("/api/external/project", projectAPI.updateExtern);

router.get("/api/projects", projectAPI.browse);
router.get("/api/project/:projectName", projectAPI.findOne);

const multer = require("multer");
const storage = multer.diskStorage({ destination: null });
var upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});
router.post(
  "/api/project",
  upload.array("File", 10),
  projectAPI.create
);

var uploadEmpty = multer();
router.put(
  "/api/project/:projectName",
  uploadEmpty.none(),
  projectAPI.update
);

router.delete("/api/project/:projectName", projectAPI._delete);

export default router;
