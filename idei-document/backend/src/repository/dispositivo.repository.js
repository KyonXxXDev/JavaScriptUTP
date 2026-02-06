import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import { Dispositivo } from '../schema/dispositivo.schema.js';

const DB_PATH = './src/mocks/dispositivo.json';

export class DispositivoRepository {

  async #read() {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  }

  async #write(data) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  }

  async findAll({ onlyActive = true } = {}) {
    const dispositivos = await this.#read();
    return onlyActive ? dispositivos.filter(d => d.estado) : dispositivos;
  }

  async findById({ id }) {
    const dispositivos = await this.#read();
    return dispositivos.find(d => d.id === id && d.estado);
  }

  async findByTienda({ tiendaId, tipo }) {
    const dispositivos = await this.#read();
    console.log(tiendaId)
    console.log(tipo)

    return dispositivos.filter(d =>
      d.estado &&
      d.tiendaId === tiendaId &&
      (!tipo || d.tipo === tipo)
    );
  }

  async countByTiendaAndTipo({ tiendaId, tipo }) {
    const dispositivos = await this.findByTienda({ tiendaId, tipo });
    return dispositivos.length;
  }

  async create({ data }) {
    const dispositivos = await this.#read();

    const dispositivo = new Dispositivo({ data });
    dispositivo.id = crypto.randomUUID();

    dispositivos.push(dispositivo);
    await this.#write(dispositivos);

    return dispositivo;
  }

  async delete({ id }) {
    const dispositivos = await this.#read();
    const index = dispositivos.findIndex(d => d.id === id && d.estado);

    if (index === -1) return false;

    dispositivos[index].estado = false;
    dispositivos[index].updatedAt = new Date();

    await this.#write(dispositivos);
    return true;
  }
}