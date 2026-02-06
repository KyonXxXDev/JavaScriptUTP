import { AsociacionService } from "../service/asociacion.service.js";

export class AsociacionController {
  constructor() {
    this.service = new AsociacionService();
  }

  getAll = async (req, res) => {
    res.json(await this.service.getAll());
  };

  getById = async (req, res) => {
    const id = req.params.id
    const asociacion = await this.service.getById({id});
    if (!asociacion) return res.status(404).json({ message: "No encontrada" });
    res.json(asociacion);
  };

  create = async (req, res) => {
    try {
      const data = req.body
      const asociacion = await this.service.create({data});
      res.status(201).json(asociacion);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  update = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const asociacion = await this.service.update({id, data});
    if (!asociacion) return res.status(404).json({ message: "No encontrada" });
    res.json(asociacion);
  };

  delete = async (req, res) => {
    const id = req.params.id;
    const deleted = await this.service.delete({id});
    if (!deleted) return res.status(404).json({ message: "No encontrada" });
    res.status(204).send();
  };
}