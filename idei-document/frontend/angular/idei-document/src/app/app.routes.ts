import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Dashboard } from './dashboard/dashboard';
import { Tienda } from './tienda/tienda';
import { Asociacion } from './asociacion/asociacion';
import { Certificado } from './certificado/certificado';

export const routes: Routes = [
    {
        path: '',
        title: 'Home Page',
        component: Home
    },
    {
        path: 'dashboard',
        title: 'Dashboard Page',
        component: Dashboard
    },
    {
        path: 'tienda',
        title: 'Tiendas Page',
        component: Tienda
    },
    {
        path: 'certificado',
        title: 'Certificados Page',
        component: Certificado
    },
    {
        path: 'asociacion',
        title: 'Asociaciones Page',
        component: Asociacion
    }
];
