import { AsociacionRepository } from "../repository/asociacion.repository.js";
import { CertificadoRepository } from "../repository/certificado.repository.js";
import { TiendaRepository } from "../repository/tienda.repository.js";
import { UbicacionRepository } from "../repository/ubicacion.repository.js";
import { MONTHS } from "../utils/const.js";
import { htmlToPDF, renderTemplate } from "../utils/converterToPDF.js";
import { imageToBase64 } from "../utils/imageToBase64.js";
import { DateUtils } from "../web/js/global.js";

export class CertificadoService {
    constructor() {
        this.repo = new CertificadoRepository();
        this.tiendaRepo = new TiendaRepository();
        this.asociacionRep = new AsociacionRepository();
        this.ubicacionRepo = new UbicacionRepository();
    }

    getAll() {
        return this.repo.findAll();
    }

    async generar({ tiendaId, tipo, cantidad, fechaEmision }) {
        const tienda = await this.tiendaRepo.findById({ id: tiendaId });
        if (!tiendaId || !tipo) {
            throw new Error("Tienda y tipo de certificado son obligatorios");
        }

        if (!["LE", "DH"].includes(tipo)) {
            throw new Error("Tipo de certificado inválido");
        }

        tienda.departamentoName = await this.ubicacionRepo.getDepartamentoById({ id: tienda.departamento });
        tienda.provinciaName = await this.ubicacionRepo.getProvinciaById({ id: tienda.provincia });
        tienda.distritoName = await this.ubicacionRepo.getDistritoById({ id: tienda.distrito });

        if (!tienda) {
            throw new Error("La tienda no existe o está inactiva");
        }
        const asociacion = await this.asociacionRep.findById({ id: tienda.asociacionId })

        // const cantidad = await this.dispositivoRepo.countByTiendaAndTipo({
        //     tiendaId,
        //     tipo
        // });

        if (cantidad === 0) {
            throw new Error("No existen dispositivos para generar el certificado");
        }

        const template =
            tipo === "LE"
                ? "./src/template/certificado-le.html"
                : "./src/template/certificado-dh.html";
        const { stringLargeDate, month, year } = await DateUtils.formatDate({ fecha: fechaEmision });

        const payload = {
            ...tienda,
            cantidad: cantidad > 9 ? cantidad : `0${cantidad}`,
            tipo,
            logo: await imageToBase64("src/assets/Logo-idei.jpg"),
            firmaGerente: await imageToBase64("src/assets/Firma-gerente.png"),
            firmaIng: await imageToBase64("src/assets/Firma-ing.jpg"),
            fecha: stringLargeDate,
            razon: asociacion.nombre,
            ruc: asociacion.nDocumento,
            departamento: tienda.departamentoName.name,
            provincia: tienda.provinciaName.name,
            distrito: tienda.distritoName.name
        };

        const html = await renderTemplate(template, payload);
        const pdfPath = `./src/output/${tienda.nombre}-CERTIFICADO DE OPERATIVIDAD ${tipo === "DH" ? "DETECTORES DE HUMO" : "LUCES DE EMERGENCIA"} ${MONTHS[Number(month)].toUpperCase().slice(0, 3)}${year}.pdf`;

        await htmlToPDF(html, pdfPath);

        return this.repo.create({
            data: {
                tiendaId,
                cantidad,
                tipo,
                template,
                fechaEmision: stringLargeDate
            }
        });
    }

    getByTienda({ tiendaId }) {
        return this.repo.findByTienda({ tiendaId });
    }

    delete({ id }) {
        return this.repo.delete({ id });
    }
}