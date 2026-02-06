import { Router } from "express";
import { AsociacionController } from "../controller/asociacion.controller.js";

const router = Router();
const controller = new AsociacionController();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.delete);

export default router;