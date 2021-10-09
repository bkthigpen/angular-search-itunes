import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ResultFunc } from 'rxjs/internal/observable/generate';
import { ConfigService } from 'src/app/config/config.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  @Input() form = new FormControl();
  @Input() label: string = 'Label';
  @Input() placeholder: string = "Placeholder";
  @Input() results: [] = [];

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
  }

  getResults(): void {
    // this.loading = true;
    // this.errorMessage = '';
    this.configService.getResponse(this.form.value)
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received', response)
          this.results = response;
        },
        (error) => {                              //error() callback
          console.error('Request failed with error', error)
          // this.errorMessage = error;
          // this.loading = false;
        })
  }

}
