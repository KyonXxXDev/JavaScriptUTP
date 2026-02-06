import { CertificadoService } from "../service/certificado.service.js";

export class CertificadoController {
  constructor() {
    this.service = new CertificadoService();
  }

  generar = async (req, res) => {
    const {tiendaId, tipo} = req.body;
    const { cantidad, fechaEmision } = req.body
    res.json(await this.service.generar({tiendaId, tipo, cantidad, fechaEmision}));
  };

  getByTienda = async (req, res) => {
    const tiendaId = req.params.id
    const certificado = await this.service.getByTienda({tiendaId});
    if (!certificado) return res.status(404).json({ message: "No encontrada" });
    res.json(certificado);
  };


  delete = async (req, res) => {
    const id = req.params.id;
    const deleted = await this.service.delete({id});
    if (!deleted) return res.status(404).json({ message: "No encontrada" });
    res.status(204).send();
  };
}