import {Component, HostListener} from '@angular/core';
import {Observable, Subscription} from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works2!';
  lastStart : number;
  running : boolean;
  elapsed : number = 0;
  timer : Subscription;

  updateElapsed() {
    this.elapsed = new Date().getTime() - this.lastStart;
    //console.log(this.elapsed);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(ev: KeyboardEvent) : void {
    console.log("yep!")

    if(!this.running) {
      this.running = true;
      this.lastStart = new Date().getTime();
      this.timer = Observable.timer(0, 50).subscribe(n => this.updateElapsed());

    } else {
      this.running = false;
      this.timer.unsubscribe();
    }
  }

}
