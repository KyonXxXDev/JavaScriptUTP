import { Router } from "express";
import { UbicacionController } from "../controller/ubicacion.controller.js";

const router = Router();
const controller = new UbicacionController();

router.get(
  "/departamentos",
  controller.getDepartamentos
);

router.get(
  "/departamentos/:departamentoId/provincias",
  controller.getProvincias
);

router.get(
  "/provincias/:provinciaId/distritos",
  controller.getDistritos
);

export default router;