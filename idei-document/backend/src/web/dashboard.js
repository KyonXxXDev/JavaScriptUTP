class Dashboard {
    constructor() {
        this.records = [];
        this.filteredRecords = [];
        this.init();
    }

    async init() {
        await this.loadRecords();
        this.setupEventListeners();
        this.render();
    }

    async loadRecords() {
        try {
            const response = await fetch('/tienda');
            if (!response.ok) throw new Error('Error al cargar los registros');
            this.records = await response.json();
            this.filteredRecords = [...this.records];
        } catch (error) {
            console.error('Error:', error);
            this.showErrorMessage('No se pudieron cargar los registros');
        }
    }

    setupEventListeners() {
        const searchInput = document.getElementById('search-input');
        const sortSelect = document.getElementById('sort-select');
        const exportBtn = document.getElementById('export-btn');
        const refreshBtn = document.getElementById('refresh-btn');

        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        sortSelect.addEventListener('change', (e) => this.handleSort(e.target.value));
        exportBtn.addEventListener('click', () => this.exportCSV());
        refreshBtn.addEventListener('click', () => this.refresh());
    }

    handleSearch(query) {
        const lowerQuery = query.toLowerCase();
        this.filteredRecords = this.records.filter(record =>
            record.nombre.toLowerCase().includes(lowerQuery) ||
            record.direccion.toLowerCase().includes(lowerQuery)
        );
        this.render();
    }

    handleSort(sortType) {
        switch (sortType) {
            case 'newest':
                this.filteredRecords.sort((a, b) => 
                    new Date(b.createdAt) - new Date(a.createdAt)
                );
                break;
            case 'oldest':
                this.filteredRecords.sort((a, b) => 
                    new Date(a.createdAt) - new Date(b.createdAt)
                );
                break;
            case 'name':
                this.filteredRecords.sort((a, b) => 
                    a.nombre.localeCompare(b.nombre)
                );
                break;
            case 'lights':
                this.filteredRecords.sort((a, b) => 
                    parseInt(b.cantidad) - parseInt(a.cantidad)
                );
                break;
        }
        this.render();
    }

    getDepartmentName(deptId) {
        const departments = {
            '01': 'Amazonas', '02': 'Áncash', '03': 'Apurímac', '04': 'Arequipa',
            '05': 'Ayacucho', '06': 'Cajamarca', '07': 'Cusco', '08': 'Huancavelica',
            '09': 'Huánuco', '10': 'Ica', '11': 'Junín', '12': 'La Libertad',
            '13': 'Lambayeque', '14': 'Lima', '15': 'Loreto', '16': 'Madre de Dios',
            '17': 'Moquegua', '18': 'Pasco', '19': 'Piura', '20': 'Puno',
            '21': 'San Martín', '22': 'Tacna', '23': 'Tumbes', '24': 'Ucayali'
        };
        return departments[deptId] || deptId;
    }

    getProvinceName(deptId, provId) {
        const provinces = {
            '04': { '0401': 'Arequipa', '0402': 'Camaná', '0403': 'Caravelí' },
            '18': { '1801': 'Pasco', '1802': 'Chanchamayo', '1803': 'Satipo' },
            '19': { '1901': 'Lima', '1902': 'Barranca', '1903': 'Cañete' }
        };
        return (provinces[deptId] && provinces[deptId][provId]) || provId;
    }

    getDistrictName(distId) {
        const districts = {
            '180101': 'Pasco', '190102': 'San Isidro', '040104': 'Arequipa'
        };
        return districts[distId] || distId;
    }

    updateStats() {
        const totalRecords = this.records.length;
        const totalLights = this.records.reduce((sum, r) => sum + parseInt(r.cantidad || 0), 0);
        const last24h = this.records.filter(r => {
            const recordDate = new Date(r.createdAt);
            const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            return recordDate > oneDayAgo;
        }).length;

        document.getElementById('total-records').textContent = totalRecords;
        document.getElementById('total-lights').textContent = totalLights.toLocaleString();
        document.getElementById('records-24h').textContent = last24h;
    }

    formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-PE', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });
    }

    formatDateTime(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-PE', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    render() {
        const tbody = document.getElementById('records-body');
        const noRecords = document.getElementById('no-records');

        if (this.filteredRecords.length === 0) {
            tbody.innerHTML = '';
            noRecords.style.display = 'block';
            this.updateStats();
            return;
        }

        noRecords.style.display = 'none';
        tbody.innerHTML = this.filteredRecords.map(record => `
            <tr>
                <td><strong>${record.nombre}</strong></td>
                <td><span class="badge">${record.cantidad}</span></td>
                <td>${record.direccion || '-'}</td>
                <td>${this.getDepartmentName(record.departamento)}</td>
                <td>${this.getProvinceName(record.departamento, record.provincia)}</td>
                <td>${this.getDistrictName(record.distrito)}</td>
                <td>${record.fecha || '-'}</td>
                <td>${this.formatDateTime(record.createdAt)}</td>
            </tr>
        `).join('');

        this.updateStats();
    }

    exportCSV() {
        if (this.filteredRecords.length === 0) {
            alert('No hay registros para exportar');
            return;
        }

        const headers = ['Tienda/Empresa', 'Cantidad de Luces', 'Dirección', 'Departamento', 'Provincia', 'Distrito', 'Fecha', 'Registrado'];
        const rows = this.filteredRecords.map(record => [
            record.nombre,
            record.cantidad,
            record.direccion || '-',
            this.getDepartmentName(record.departamento),
            this.getProvinceName(record.departamento, record.provincia),
            this.getDistrictName(record.distrito),
            record.fecha || '-',
            this.formatDateTime(record.createdAt)
        ]);

        const csv = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `certificados_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    async refresh() {
        const btn = document.getElementById('refresh-btn');
        btn.disabled = true;
        btn.textContent = 'Actualizando...';
        
        await this.loadRecords();
        this.filteredRecords = [...this.records];
        this.render();
        
        btn.disabled = false;
        btn.textContent = 'Actualizar';
    }

    showErrorMessage(message) {
        const tbody = document.getElementById('records-body');
        tbody.innerHTML = `<tr class="loading-row"><td colspan="8">${message}</td></tr>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});
