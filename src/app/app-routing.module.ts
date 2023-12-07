import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CubeConundrumComponent } from "./components/cube-conundrum/cube-conundrum.component";
import { TrebuchetComponent } from "./components/trebuchet/trebuchet.component";
import { Day3GearRatiosComponent } from "./components/day3-gear-ratios/day3-gear-ratios.component";

const routes: Routes = [
  { path: "day1", component: TrebuchetComponent },
  { path: "day2", component: CubeConundrumComponent },
  { path: "day3", component: Day3GearRatiosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
