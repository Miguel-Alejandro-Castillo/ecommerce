import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/interfaces/product';
import { CloneService } from 'src/app/services/clone.service';

@Component({
  selector: 'app-dialog-cart-products',
  templateUrl: './dialog-cart-products.component.html',
  styleUrls: ['./dialog-cart-products.component.css']
})
export class DialogCartProductsComponent implements OnInit {

  cart: any = [];
/*   cartCopy: any[];
 */
  constructor(public dialogRef: MatDialogRef<DialogCartProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private cloneService: CloneService) { }

  ngOnInit() {
    console.log('onInit Dialog');
/*     this.cartCopy = this.cloneService.clone(this.data.cart);
 */  }

  onClose(): void {
    this.dialogRef.close(/* this.cartCopy */);
  }

  add(index: number, cant: number) {
    this.data.cart[index].cant += cant;
    if (this.data.cart[index].cant === 0) {
      this.data.cart.splice(index, 1);
    }
  }

}

