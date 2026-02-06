import { Router } from "express";
import { DispositivoController } from "../controller/dispositivo.controller.js";

const router = Router();
const controller = new DispositivoController();

router.get("/", controller.getAll);

router.get("/tienda/:id", controller.getByTienda);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.delete);

export default router;