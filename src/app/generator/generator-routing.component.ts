import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneratorComponent } from './generator.component';;

const routes: Routes = [
  { path: '', component: GeneratorComponent, data: { name: 'generator', logedPage: false } }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class GeneratorRoutingModule { }
