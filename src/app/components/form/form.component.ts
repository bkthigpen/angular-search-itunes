import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
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
  @Input() dataSource = new MatTableDataSource();
  @Input() columnNames: { id: string, value: string }[] = [
    { id: 'trackName', value: 'Song' },
    { id: 'artistName', value: 'Artist' },
    { id: 'collectionName', value: 'Album Name' }
  ];
  @Input() displayedColumns: any[] = [];
  @Input() results: boolean = false;

  constructor(private configService: ConfigService) {}

  ngOnInit(): void {
    this.displayedColumns = this.columnNames.map(column => column.id);
  }

  createTable(source: any) {
    this.dataSource = new MatTableDataSource(source);
  }

  getResults(): void {
    // this.loading = true;
    // this.errorMessage = '';
    this.configService.getResponse(this.form.value)
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received', response)
          // this.results = response.results;
          // this.dataSource = response.results;

          // only using this flag to render the table
          // can do without it if we went with the keystroke route
          this.results = true;
          this.createTable(response.results);

          // clear input after each successful call
          this.clearInput();
        },
        (error) => {                              //error() callback
          console.error('Request failed with error', error)
          // this.errorMessage = error;
          // this.loading = false;
          this.clearInput();
        })
  }

  clearInput() {
    this.form.setValue('');
  }
}
