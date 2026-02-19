export class DateUtils {
    static async formatDate({ fecha }) {
        try {
            if (!fecha || typeof fecha !== "string") {
                throw new Error("Fecha inválida: debe ser string");
            }

            const parts = fecha.split(/[-/.]/);

            if (parts.length !== 3) {
                throw new Error("Formato inválido. Debe ser dd-mm-yyyy");
            }

            const [day, month, year] = parts;

            const dayNum = Number(day);
            const monthNum = Number(month);
            const yearNum = Number(year);

            const date = new Date(yearNum, monthNum - 1, dayNum);

            const stringLargeDate = date.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            return {
                day: dayNum,
                month: monthNum,
                year: yearNum,
                stringLargeDate
            };
        } catch (error) {
            console.error('Error formatting date', error.message);
        }
    }
}

export class ApiService {
    static async get({ url }) {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('Error en GET ' + url);
            return res.json();
        } catch (error) {
            console.error('Error in get', error.message);
        }
    }
    static async post({ url, data }) {
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!res.ok) throw new Error('Error en POST ' + url);
            return res.json()
        } catch (error) {
            console.error('Error in post', error.message);
        }
    }
}

export class UbicacionService {
    static async getDepartamentos() {
        try {
            return await ApiService.get({ url: '/ubicacion/departamentos' });
        } catch (error) {
            console.error('Error get departamentos', error.message);
        }
    }

    static async getProvincias(departamentoId) {
        try {
            return await ApiService.get({ url: `/ubicacion/departamentos/${departamentoId}/provincias` });
        } catch (error) {
            console.error('Error get provincias', error.message);
        }
    }

    static async getDistritos(provinciaId) {
        try {
            return await ApiService.get({ url: `/ubicacion/provincias/${provinciaId}/distritos` });
        } catch (error) {
            console.error('Error get distritos', error.message);
        }
    }
}