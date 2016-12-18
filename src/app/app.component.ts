import {Component, OnInit} from '@angular/core';
import {CubeService} from './cube.service';
import {Measurement} from "./measurement";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  scramble: string[];
  totalHistory: Measurement[] = [];
  chartData: any[] = [];
  error: string;

  constructor(private cubeService: CubeService) {
  }

  ngOnInit(): void {

    this.cubeService.getAllMeasurements().subscribe(
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
    this.scramble = this.cubeService.getNextScramble();
  }

  updateChartData() {
    let i = 0;
    var series = this.totalHistory.map(item => {
      i++;
      return {name: i, value: item.elapsedTime}
    });
    this.chartData = [{name: "Time for Solve", series: series}];
  }

  persistState(): void {
    this.updateChartData();
    this.cubeService.persistMeasurements(this.totalHistory);
  }


}
