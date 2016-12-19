import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NG2D3Module } from 'ng2d3';
import { Ng2Webstorage } from 'ng2-webstorage';

import { TimePipe } from './pipes/time.pipe';
import { DatePipe } from './pipes/date.pipe';
import { ScramblePipe } from './pipes/scramble.pipe';
import { ColorPipe } from './pipes/color.pipe';

import { CubeService } from './services/cube.service';
import { OptionsService } from "./services/options.service";

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { TimerComponent } from './timer/timer.component';
import { ScrambleComponent } from './scramble/scramble.component';
import { OptionsComponent } from './options/options.component';


@NgModule({
  declarations: [
    AppComponent,
    TimePipe,
    ChartComponent,
    TimerComponent,
    DatePipe,
    ScramblePipe,
    ScrambleComponent,
    ColorPipe,
    OptionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NG2D3Module,
    Ng2Webstorage
  ],
  providers: [CubeService, OptionsService],
  entryComponents: [OptionsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
