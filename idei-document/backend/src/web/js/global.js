export class DateUtils {
    static formatDate({ fecha }) {
        try {
            const [day, month, year ] = fecha.split(/[-/.]/);
            const date = new Date(year, month, day);
            const options = {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }
            console.log(date.toLocaleDateString('es-ES', options));
            return date.toLocaleDateString('es-ES', options);
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