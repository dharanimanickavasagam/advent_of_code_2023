import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CubeConundrumComponent } from './components/cube-conundrum/cube-conundrum.component';
import { TrebuchetComponent } from './components/trebuchet/trebuchet.component';

const routes: Routes = [
  {path: 'day1' , component: TrebuchetComponent},
  {path: 'day2' , component: CubeConundrumComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }