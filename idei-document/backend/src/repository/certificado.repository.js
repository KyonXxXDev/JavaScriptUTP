import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import { Certificado } from '../schema/certificado.schema.js';

const DB_PATH = './src/mocks/certificado.json';

export class CertificadoRepository {

  async #read() {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  }

  async #write(data) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  }

  async findAll({ onlyActive = true } = {}) {
    const certificados = await this.#read();
    return onlyActive ? certificados.filter(c => c.estado) : certificados;
  }

  async findByTienda({ tiendaId }) {
    const certificados = await this.#read();
    return certificados.filter(c => c.tiendaId === tiendaId && c.estado);
  }

  async create({ data }) {
    const certificados = await this.#read();

    const certificado = new Certificado({ data });
    certificado.id = crypto.randomUUID();

    certificados.push(certificado);
    await this.#write(certificados);

    return certificado;
  }

  async delete({ id }) {
    const certificados = await this.#read();
    const index = certificados.findIndex(c => c.id === id && c.estado);

    if (index === -1) return false;

    certificados[index].estado = false;
    certificados[index].updatedAt = new Date();

    await this.#write(certificados);
    return true;
  }
}
