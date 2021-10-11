import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigService } from 'src/app/config/config.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

// this is our smart component...for now
// now to read up on componentizing in Angular
// when I have free time
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
    this.configService.getResponse(this.form.value)
      .subscribe(
        (response) => {
          console.log('response received', response)
          // only using this flag to render the table
          // can do without it if we go with the keystroke route
          this.results = true;
          this.createTable(response.results);

          // clear input after each successful call
          this.clearInput();
        },
        (error) => {
          console.error('Request failed with error', error)
          this.clearInput();
        })
  }

  clearInput() {
    this.form.setValue('');
  }
}
