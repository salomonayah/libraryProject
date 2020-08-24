import { Routes } from '@angular/router';

import { BookLibraryLayoutComponent } from './layouts/bookLibrary-layout/bookLibrary-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'allAvailableBooks',
    pathMatch: 'full',
  }, {
    path: '',
    component: BookLibraryLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/bookLibrary-layout/bookLibrary-layout.module#BookLibraryModule'
  }]},
  {
    path: '**',
    redirectTo: 'allAvailableBooks'
  }
]
