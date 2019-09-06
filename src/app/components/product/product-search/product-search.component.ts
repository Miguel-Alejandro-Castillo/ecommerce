import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Product } from 'src/app/models/interfaces/product';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  @Output()
  query: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  searchString: string;


  ngOnInit() {
  }

  onKeyUp(event: any) {
    this.query.emit(this.searchString);
    // if (this.searchString && this.searchString.trim()) {
    //     const str = this.searchString.trim().toUpperCase();
    //     const strRegExp = str.split('').join('.*');
    //     const searchRegexp = new RegExp(strRegExp, 'i');
    //     // implement search
    //     const result: Product[] = this.products.filter(p => p.name.toUpperCase().match(searchRegexp) ||
    //                                                         p.description.toUpperCase().match(searchRegexp) );
    //     this.searchProduct.emit(result);
    // } else {
    //     this.searchProduct.emit(this.products);
    // }
  }

}
