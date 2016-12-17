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

  onTimerDone(event: Measurement) {
    this.currentSession.push(event);
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
