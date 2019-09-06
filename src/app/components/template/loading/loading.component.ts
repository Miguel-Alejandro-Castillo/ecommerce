import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  public loadingService: LoadingService;

  constructor(private loadingServiceL: LoadingService) {
    this.loadingService = loadingServiceL;
  }

  ngOnInit() {
  }

}