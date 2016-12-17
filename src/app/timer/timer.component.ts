import {Component, HostListener, EventEmitter, Output, Input} from '@angular/core';
import {Subscription, Observable} from "rxjs";
import {Measurement} from "../measurement";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent {

  @Input() scramble : string[];
  @Output() onDone : EventEmitter<Measurement> = new EventEmitter<Measurement>();

  lastStart: number;
  running: boolean;
  elapsedTime: number = 0;
  timer: Subscription;

  constructor() { }

  updateElapsed(): void {
    this.elapsedTime = new Date().getTime() - this.lastStart;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(ev: KeyboardEvent): void {

    ev.preventDefault();
    ev.stopPropagation();

    if (!this.running) {
      this.running = true;
      this.lastStart = new Date().getTime();
      this.timer = Observable.timer(0, 50).subscribe(n => this.updateElapsed());

    } else {
      this.updateElapsed();
      this.running = false;
      this.timer.unsubscribe();
      this.onDone.emit({startTime: this.lastStart, elapsedTime: this.elapsedTime, scramble: this.scramble});
    }
  }


}
