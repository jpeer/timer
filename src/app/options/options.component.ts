import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

import {OptionsService} from "../services/options.service";
import {Options} from "../options";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal, private optionsService : OptionsService) {

    this.optionsService.getOptionsObject().subscribe(opt => {
      this.initialOptions = opt;
    })
  }

  form : FormGroup;
  initialOptions: Options;

  ngOnInit() {
      this.form = this.fb.group(
        {
          scrambleSize : new FormControl(this.initialOptions.scrambleSize),
          colorTheme : new FormControl(this.initialOptions.colorTheme)
        }
      );
  }

  optionsChanged() {
    console.log('options changed!');
    this.optionsService.updateOptions( this.form.value);
  }

}
