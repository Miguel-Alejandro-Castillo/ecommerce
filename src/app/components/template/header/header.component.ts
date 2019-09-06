import { Component, OnInit } from '@angular/core';
import { Portal } from '@angular/cdk/portal';
import { BehaviorSubject } from 'rxjs';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  portalContent$: BehaviorSubject<Portal<any>>;

  constructor(private headerService: HeaderService) {
    this.portalContent$ = this.headerService.portalContent$;
  }

  ngOnInit() {
  }

}
