import { DispositivoService } from "../service/dispositivo.service.js";

export class DispositivoController {
  constructor() {
    this.service = new DispositivoService();
  }

  getAll = async (req, res) => {
    res.json(await this.service.getAll());
  };

  getByTienda = async (req, res) => {
    const tiendaId = req.params.id
    const tipo = req.query.tipo
    const dispositivo = await this.service.getByTienda({ tiendaId, tipo });
    if (!dispositivo) return res.status(404).json({ message: "No encontrada" });
    res.json(dispositivo);
  };

  create = async (req, res) => {
    try {
      const data = req.body
      const dispositivo = await this.service.create({data});
      res.status(201).json(dispositivo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  update = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const dispositivo = await this.service.update({id, data});
    if (!dispositivo) return res.status(404).json({ message: "No encontrada" });
    res.json(dispositivo);
  };

  delete = async (req, res) => {
    const id = req.params.id;
    const deleted = await this.service.delete({id});
    if (!deleted) return res.status(404).json({ message: "No encontrada" });
    res.status(204).send();
  };
}