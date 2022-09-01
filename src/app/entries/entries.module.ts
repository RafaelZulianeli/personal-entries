import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntriesComponent } from './entries.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: EntriesComponent,
  },
];

@NgModule({
  declarations: [EntriesComponent],
  exports: [RouterModule],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class EntriesModule {}
