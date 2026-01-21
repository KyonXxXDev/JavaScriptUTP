import { TiendaService } from '../service/tienda.service.js';

export class TiendaController {
  constructor() {
    this.service = new TiendaService();
  }

  getAll = async (req, res) => {
    res.json(await this.service.getAll());
  };

  getById = async (req, res) => {
    const id = req.params.id
    const tienda = await this.service.getById({id});
    if (!tienda) return res.status(404).json({ message: "No encontrada" });
    res.json(tienda);
  };

  create = async (req, res) => {
    try {
      const data = req.body
      const tienda = await this.service.create({data});
      res.status(201).json(tienda);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  update = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const tienda = await this.service.update({id, data});
    if (!tienda) return res.status(404).json({ message: "No encontrada" });
    res.json(tienda);
  };

  delete = async (req, res) => {
    const id = req.params.id;
    const deleted = await this.service.delete({id});
    if (!deleted) return res.status(404).json({ message: "No encontrada" });
    res.status(204).send();
  };
}