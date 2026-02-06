import { Router } from "express";
import { CertificadoController } from "../controller/certificado.controller.js";

const router = Router();
const controller = new CertificadoController();

router.post("/generar", controller.generar);

router.get("/tienda/:id", controller.getByTienda);

router.delete("/:id", controller.delete);

export default router;