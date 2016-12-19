import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Measurement} from "./measurement";
import {CubeService} from './services/cube.service';
import {OptionsService} from "./services/options.service";
import {OptionsComponent} from "./options/options.component";
import {Options} from "./options";

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
  options: Options;

  constructor(private cubeService: CubeService, private modalService: NgbModal, private optionsService: OptionsService ) {
    this.optionsService.getOptionsObject().subscribe(opt => this.options = opt);

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
  }

  ngOnInit(): void {
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
    this.scramble = this.cubeService.getNextScramble(this.options.scrambleSize);
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

  openOptions() {
    console.log('opening modal');
    const modalRef = this.modalService.open(OptionsComponent);
  }

}
