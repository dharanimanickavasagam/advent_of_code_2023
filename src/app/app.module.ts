import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TrebuchetComponent } from "./components/trebuchet/trebuchet.component";
import { CubeConundrumComponent } from "./components/cube-conundrum/cube-conundrum.component";
import { Day3GearRatiosComponent } from "./components/day3-gear-ratios/day3-gear-ratios.component";

@NgModule({
  declarations: [
    AppComponent,
    TrebuchetComponent,
    CubeConundrumComponent,
    Day3GearRatiosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
