import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import { Asociacion } from '../schema/asociacion.schema.js';

const DB_PATH = './src/mocks/asociacion.json';

export class AsociacionRepository {

    async #read() {
        const data = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    }

    async #write(data) {
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
    }

    async findAll({ onlyActive = true } = {}) {
        const asociaciones = await this.#read();
        return onlyActive ? asociaciones.filter(a => a.estado) : asociaciones;
    }

    async findById({ id }) {
        const asociaciones = await this.#read();
        return asociaciones.find(a => a.id === id && a.estado);
    }

    async create({ data }) {
        const asociaciones = await this.#read();

        const asociacion = new Asociacion({ data });
        asociacion.id = crypto.randomUUID();

        asociaciones.push(asociacion);
        await this.#write(asociaciones);

        return asociacion;
    }

    async update({ id, data }) {
        const asociaciones = await this.#read();
        const index = asociaciones.findIndex(a => a.id === id && a.estado);

        if (index === -1) return null;

        asociaciones[index] = {
            ...asociaciones[index],
            ...data,
            updatedAt: new Date()
        };

        await this.#write(asociaciones);
        return asociaciones[index];
    }

    async delete({ id }) {
        const asociaciones = await this.#read();
        const index = asociaciones.findIndex(a => a.id === id && a.estado);

        if (index === -1) return false;

        asociaciones[index].estado = false;
        asociaciones[index].updatedAt = new Date();

        await this.#write(asociaciones);
        return true;
    }
}
