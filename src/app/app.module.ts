import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'angular2-cookie/services/cookies.service'
import { NG2D3Module } from 'ng2d3';

import { AppComponent } from './app.component';
import { TimePipe } from './time.pipe';
import { CubeService } from './cube.service';
import { AuthService } from "./auth.service";
import { ChartComponent } from './chart/chart.component';
import { TimerComponent } from './timer/timer.component';
import { DatePipe } from './date.pipe';
import { ScramblePipe } from './scramble.pipe';


@NgModule({
  declarations: [
    AppComponent,
    TimePipe,
    ChartComponent,
    TimerComponent,
    DatePipe,
    ScramblePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    NG2D3Module
  ],
  providers: [CubeService, CookieService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
