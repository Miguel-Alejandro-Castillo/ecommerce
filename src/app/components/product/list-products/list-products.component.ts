import {
  Component,
  OnInit,
  ViewContainerRef,
  AfterViewInit,
  ViewChild,
  TemplateRef,
  OnDestroy
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  Subject,
  concat,
  empty,
  EMPTY
} from 'rxjs';

import {
  map,
  debounceTime,
  delay,
  catchError,
  repeatWhen,
  finalize,
  tap
} from 'rxjs/operators';

import { Product } from '../../../models/interfaces/product';
import { DialogCartProductsComponent } from '../dialog-cart-products/dialog-cart-products.component';
import { ProductService } from 'src/app/services/product.service';
import { HeaderService } from 'src/app/services/header.service';
import { TemplatePortal } from '@angular/cdk/portal';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  products: Product[] = [];
  result: Product[] = [];
  cart: any[] = [];

  retry$: Subject<void> = new Subject<void>();
  errors$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  filter$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  products$: Observable<Product[]>;
  filteredProducts$: Observable<any>;

  currentPage = 6;
  totalItems = 11;
  itemsPerPage = 1;

  templatePortal: TemplatePortal<any>;

  @ViewChild('templatePortalContent')
  templatePortalContent: TemplateRef<any>;

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private headerService: HeaderService,
    private _viewContainerRef: ViewContainerRef,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {

    this.products$ = concat(
      EMPTY.pipe(
        finalize(() => {
          this.errors$.next(false);
          this.loadingService.showLoading();
          console.log('Mostrar loading');
        })
      ),
      EMPTY.pipe(delay(5000)),
      this.productService.getProducts().pipe(
        catchError(errors => {
          console.log('errors', errors);
          this.errors$.next(true);
          return EMPTY;
        })
      ),
      EMPTY.pipe(
        finalize(() => {
          this.loadingService.hideLoading();
          console.log('Ocultar loading');
        })
      )
    ).pipe(repeatWhen(() => this.retry$));

    this.filteredProducts$ = combineLatest(
      this.filter$.pipe(debounceTime(400)),
      this.products$
    ).pipe(
      map(data => {
        const [filter, products]: any = data;
        return products.filter(product => {
          const strRegExp = filter.trim().split('').join('.*');
          const searchRegexp = new RegExp(strRegExp, 'i');
          return product.name.match(searchRegexp) || product.description.match(searchRegexp);
        });
      })
    );
  }

  ngAfterViewInit(): void {
    this.templatePortal = new TemplatePortal(
      this.templatePortalContent,
      this._viewContainerRef
    );
    this.headerService.portalContent$.next(this.templatePortal);
  }

  ngOnDestroy(): void {
    this.headerService.portalContent$.next(null);
  }

  onSearchProduct(result: Product[]) {
    this.result = result;
  }

  onAddProduct(product: Product) {
    const index = this.cart.findIndex(c => c.product.id === product.id);
    if (index >= 0) {
      this.cart[index].cant++;
    } else {
      this.cart.push({ product: product, cant: 1 });
    }
  }

  onRemoveProduct(product: Product) {
    const index = this.cart.findIndex(item => item.product.id === product.id);
    if (index >= 0) {
      this.cart[index].cant--;
      if (this.cart[index].cant === 0) {
        this.cart.splice(index, 1);
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCartProductsComponent, {
      width: '75%',
      data: { cart: this.cart },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      /* this.cart = result; */
    });
  }

  cantProducts() {
    return this.cart.reduce((cant, item) => cant + item.cant, 0);
  }
}
