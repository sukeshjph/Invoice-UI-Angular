import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'invoices',
    loadChildren: () => import('./invoices/invoice.routes').then(m => m.InvoicesRoutes),
  },
  {
    path: '',
    redirectTo: 'invoices',
    pathMatch: 'full',
  },
];
