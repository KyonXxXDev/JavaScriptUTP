import { ApiService, DateUtils, UbicacionService } from "../../js/global.js";

class Formulario{
    constructor() {
        this.$cantidad = this.$('cantidad');
        this.$tienda = this.$('tienda');
        this.$direccion = this.$('direccion');
        this.$departamento = this.$('departamento');
        this.$provincia = this.$('provincia');
        this.$distrito = this.$('distrito');
        this.$fecha = this.$('fecha');
        this.$btn = this.$('btnSubmit');
    }

    $ = (id) => document.getElementById(id)

    init() {
        this.loadDepartamentos();
        this.bindEvents();
    }

    bindEvents() {
        this.$departamento.addEventListener('change', () =>
            this.onDepartamentoChange()
        );

        this.$provincia.addEventListener('change', () =>
            this.onProvinciaChange()
        );

        this.$btn.addEventListener('click', (e) =>
            this.onSubmit(e)
        );
    }

    async loadDepartamentos() {
        const deps = await UbicacionService.getDepartamentos();
        deps.forEach(d => this.addOption(this.$departamento, d));
    }

    async onDepartamentoChange() {
        const id = this.$departamento.value;
        if (!id) {
            this.resetSelect(this.$provincia, 'Seleccione una provincia');
            this.resetSelect(this.$distrito, 'Seleccione un distrito');
        }
        const provincias = await UbicacionService.getProvincias(id);
        provincias.forEach(p => this.addOption(this.$provincia, p));

        this.$provincia.disabled = false;
    }

    async onProvinciaChange() {
        const id = this.$provincia.value;
        if (!id) this.resetSelect(this.$distrito, 'Seleccione un distrito');

        const distritos = await UbicacionService.getDistritos(id);
        distritos.forEach(d => this.addOption(this.$distrito, d));

        this.$distrito.disabled = false;
    }

    async onSubmit(e) {
        e.preventDefault();

        const data = {
            cantidad: this.$cantidad.value,
            nombre: this.$tienda.value,
            direccion: this.$direccion.value,
            departamento: this.getSelectedText(this.$departamento),
            provincia: this.getSelectedText(this.$provincia),
            distrito: this.getSelectedText(this.$distrito),
            fecha: DateUtils.formatDate(this.$fecha.value)
        };

        await ApiService.post({url:'/tienda', data});
        alert('✅ Certificado generado');
    }

    addOption(select, { id, name }) {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = name;
        select.appendChild(option);
    }

    resetSelect(select, placeholder) {
        select.innerHTML = `<option value="">${placeholder}</option>`;
        select.disabled = true;
    }

    getSelectedText(select) {
        return select.options[select.selectedIndex].text.toUpperCase();
    }
}

document.addEventListener('DOMContentLoaded', () =>{
    new Formulario().init()
})