import { Router } from "express";
import { TiendaController } from "../controller/tienda.controller.js";

const router = Router();
const controller = new TiendaController();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.delete);

export default router;