import { UbicacionService } from "../service/ubicacion.service.js";

export class UbicacionController {
  constructor() {
    this.service = new UbicacionService();
  }

  getDepartamentos = async (req, res) => {
    const departamentos = await this.service.getDepartamentos();
    res.json(departamentos);
  };

  getProvincias = async (req, res) => {
    const { departamentoId } = req.params;
    const provincias = await this.service.getProvincias({ departamentoId });
    res.json(provincias);
  };

  getDistritos = async (req, res) => {
    const { provinciaId } = req.params;
    const distritos = await this.service.getDistritos({ provinciaId });
    res.json(distritos);
  };
}