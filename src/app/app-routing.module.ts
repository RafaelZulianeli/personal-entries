import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'entries',
    loadChildren: () => import('./entries/entries.module').then((m) => m.EntriesModule),
  },
  {
    path: '**',
    redirectTo: 'entries',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
