import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NG2D3Module } from 'ng2d3';

import { AppComponent } from './app.component';
import { TimePipe } from './time.pipe';
import { CubeService } from './cube.service';
import { ChartComponent } from './chart/chart.component';
import { TimerComponent } from './timer/timer.component';
import { DatePipe } from './date.pipe';
import { ScramblePipe } from './scramble.pipe';
import { Ng2Webstorage } from 'ng2-webstorage';

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
    NG2D3Module,
    Ng2Webstorage
  ],
  providers: [CubeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
