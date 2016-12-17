import {Component, HostListener, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs/Rx';
import {CubeService} from './cube.service';
import {AuthService} from "./auth.service";
import {Measurement} from "./measurement";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lastStart: number;
  running: boolean;
  elapsedTime: number = 0;
  timer: Subscription;
  currentSession: Measurement[] = [];
  totalHistory: Measurement[] = [];
  scramble: string[];
  userToken: string;
  error: string;
  chartData: any[] = [];

  constructor(private cubeService: CubeService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.cubeService.getNextScramble().subscribe(result => {
      this.scramble = result;
    });
    this.userToken = this.authService.getUserToken();

    this.cubeService.getAllMeasurements(this.userToken).subscribe(
      result => {
        console.log("got all measurements: ", result);
        this.totalHistory = result;
        this.updateChartData();
      },
      err => {
        console.log("ok got error: ", err);
        this.error = err;
      });
  }

  updateElapsed(): void {
    this.elapsedTime = new Date().getTime() - this.lastStart;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(ev: KeyboardEvent): void {

    if (!this.running) {
      this.running = true;
      this.lastStart = new Date().getTime();
      this.timer = Observable.timer(0, 50).subscribe(n => this.updateElapsed());

    } else {
      this.updateElapsed();
      this.running = false;
      this.timer.unsubscribe();
      this.currentSession.push({startTime: this.lastStart, elapsedTime: this.elapsedTime, scramble: this.scramble});
    }
  }

  removeMeasurement(idx: number) {
    this.currentSession.splice(idx, 1);
  }

  updateChartData() {
    console.log("updateChartData!");
    let i = 0;
    var series = this.totalHistory.map(item => {
      i++;
      return {name: i, value: item.elapsedTime}
    });
    this.chartData = [{name: "Runs", series: series}];
  }

  storeNewMeasurements(): void {
    this.cubeService.postMeasurements(this.currentSession, this.userToken).subscribe(
      result => {
        console.log("result:", result);
        this.totalHistory = result;
        this.currentSession = [];
        this.updateChartData();
      },
      err => {
        console.log("got error: ", err);
        this.error = err;
      }
    );

  }


}
