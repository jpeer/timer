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

  userToken: string;
  scramble: string[];
  totalHistory: Measurement[] = [];
  chartData: any[] = [];
  error: string;

  constructor(private cubeService: CubeService, private authService: AuthService) {
  }

  ngOnInit(): void {

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

    this.requestNewScramble();
  }

  onTimerDone(event: Measurement) {
    this.totalHistory.push(event);
    this.persistState();
    this.requestNewScramble();
  }

  removeMeasurement(idx: number) {
    this.totalHistory.splice(idx, 1);
    this.persistState();
  }

  requestNewScramble() {
    this.cubeService.getNextScramble().subscribe(result => {
      this.scramble = result;
    });
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

  persistState(): void {
    this.cubeService.persistMeasurements(this.totalHistory, this.userToken).subscribe(
      result => {
        console.log("result:", result);
        this.totalHistory = result;
        this.updateChartData();
      },
      err => {
        console.log("got error: ", err);
        this.error = err;
      }
    );

  }


}
