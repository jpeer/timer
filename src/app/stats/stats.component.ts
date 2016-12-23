import { Component, OnInit } from '@angular/core';
import {CubeService} from "../services/cube.service";
import {Measurement} from "../measurement";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private cubeService: CubeService) { }

  best : number = 0;
  avg : number;
  bo3: number;
  bo5: number;
  bo10: number;

  ngOnInit() {
    this.cubeService.getAllMeasurements().subscribe(m => this.updateStats(m));
  }

  updateStats(m) {

    console.log("updating stats with: ", m.length);

    if(m.length == 0) {
      return;
    }

    this.best = m.sort((a, b) => { a.elapsedTime-b.elapsedTime })[0].elapsedTime;

    let sum = m.map(a => a.elapsedTime).reduce((x, y) => x + y);

    console.log("sum:", sum);
    console.log("m.length:", m.length);

    this.avg = sum / m.length;
    this.bo3 = this.bestOf(m, 3);
    this.bo5 = this.bestOf(m, 5);
    this.bo10 = this.bestOf(m, 7);
  }

  bestOf(arr: Measurement[], sliceSize: number) {
    if(arr.length < sliceSize) {
      return undefined;
    }

    let subArr : number[] = arr.reverse().slice(0, sliceSize).map(m => m.elapsedTime);
    return arr.length >= sliceSize ? Math.min(...subArr) : undefined;
  }

}
