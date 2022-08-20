import { Router } from "express";
import * as timelinerAPI from "../api/timelinerCompute";

const router = Router();
const multer = require("multer");
var uploadEmpty = multer();
router.post(
  "/api/timeliner/",
  uploadEmpty.none(),
  timelinerAPI.checkSearch
);

export default router;
