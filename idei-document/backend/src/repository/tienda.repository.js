import fs from 'node:fs/promises';
import crypto from "node:crypto";
import { Tienda } from "../schema/tienda.schema.js";
import { htmlToPDF, renderTemplate } from '../utils/converterToPDF.js';
import { imageToBase64 } from '../utils/imageToBase64.js';

const DB_PATH = "./src/mocks/tiendas.json";

export class TiendaRepository {

    async #read() {
        const data = await fs.readFile(DB_PATH, "utf-8");
        return JSON.parse(data);
    }

    async #write(data) {
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
    }

    async findAll() {
        return await this.#read();
    }

    async findById({ id }) {
        const tiendas = await this.#read();
        return tiendas.find(t => t.id === id);
    }

    async create({ data }) {
        const tiendas = await this.#read();

        const tienda = new Tienda({ data });
        tienda.id = crypto.randomUUID();

        tienda.logo = await imageToBase64("src/assets/Logo-idei.jpg");
        tienda.firmaGerente = await imageToBase64("src/assets/Firma-gerente.png");
        tienda.firmaIng = await imageToBase64("src/assets/Firma-ing.jpg");

        const html = await renderTemplate(
            './src/template/Template.html',
            tienda
        );
        const pdfPath = `./src/output/${tienda.nombre}.pdf`;
        await htmlToPDF(html, pdfPath);

        tiendas.push(tienda);
        await this.#write(tiendas);

        return tienda;
    }

    async update({ id, data }) {
        const tiendas = await this.#read();
        const index = tiendas.findIndex(t => t.id === id);

        if (index === -1) return null;

        tiendas[index] = {
            ...tiendas[index],
            ...data,
            updatedAt: new Date()
        };

        await this.#write(tiendas);
        return tiendas[index];
    }

    async delete({ id }) {
        const tiendas = await this.#read();
        const filtered = tiendas.filter(t => t.id !== id);

        if (filtered.length === tiendas.length) return false;

        await this.#write(filtered);
        return true;
    }
}