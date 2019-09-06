import { Component, ContentChild, EventEmitter, Input, OnInit, Output, ElementRef } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Product } from 'src/app/models/interfaces/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input()
  product: Product;

  // @ContentChild('app-product-card-button') appButtons: ElementRef;

  constructor() { }

  ngOnInit() {
  }

}
