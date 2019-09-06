import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'app button';
  currentPage = 6;
  /* totalPages = 11; */
  /* maxItems = 11; */

  totalItems = 11;
  itemsPerPage = 1;

}
