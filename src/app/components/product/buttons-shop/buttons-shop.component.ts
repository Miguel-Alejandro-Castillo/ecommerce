import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buttons-shop',
  templateUrl: './buttons-shop.component.html',
  styleUrls: ['./buttons-shop.component.css']
})
export class ButtonsShopComponent implements OnInit {

  @Output()
  add: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  remove: EventEmitter<void> = new EventEmitter<void>();


  constructor() { }

  ngOnInit() {
  }



  addProductCart() {
    this.add.emit();
  }

  removeProductCart() {
    this.remove.emit();
  }

}
