import {Component, HostListener, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs/Rx';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {CubeService} from './cube.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  lastStart : number;
  running : boolean;
  elapsed : number = 0;
  timer : Subscription;
  currentSession : Object[] = [];
  scramble : string[];
  service : CubeService;

  constructor(service : CubeService, private modalService: NgbModal) {
    this.service = service;
  }

  ngOnInit() : void {
    this.service.getNextScramble().subscribe(result => {this.scramble = result;});
  }

  updateElapsed() : void {
    this.elapsed = new Date().getTime() - this.lastStart;
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {

    }, (reason) => {

    });
  }


  @HostListener('document:keydown', ['$event'])
  onKeydown(ev: KeyboardEvent) : void {

    if(!this.running) {
      this.running = true;
      this.lastStart = new Date().getTime();
      this.timer = Observable.timer(0, 50).subscribe(n => this.updateElapsed());

    } else {
      this.updateElapsed();
      this.running = false;
      this.timer.unsubscribe();
      this.currentSession.push({ time: this.elapsed, scramble: this.scramble });
    }
  }

  removeMeasurement(idx : number) {
    this.currentSession.splice(idx, 1);
  }

}
