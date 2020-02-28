import { Component, OnInit, DoCheck } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Product } from 'src/app/models/interfaces/product';
import { ValidatorsCustom } from 'src/app/validators/validators-custom';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';

import {
  of,
  concat,
  empty,
  throwError,
  Observable,
  Subject,
  BehaviorSubject,
  EMPTY
} from 'rxjs';
import {
  delay,
  startWith,
  ignoreElements,
  tap,
  finalize,
  catchError,
  retryWhen,
  retry,
  repeat,
  repeatWhen
} from 'rxjs/operators';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: Product = {
    id: 1,
    name: '',
    description: '',
    trademark: 'Coca Cola',
    price: null,
    year: 1899,
    photo: '../../../assets/images/coca.jpg'
  };
  productForm: FormGroup;
  retry$: Subject<void> = new Subject<void>();
  errors$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    // Se deberia obtener el producto mediante un Service(productService)

    /* Construir el FormGroup(productForm), se usa el FormBuilder
      para facilitar la construccion del formulario(setear valores y validadores) */

    concat(
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
        }),
        finalize(() => console.log('FINALIZE REQUEST'))
      ),
      EMPTY.pipe(
        finalize(() => {
          this.loadingService.hideLoading();
          console.log('Ocultar loading');
        })
      )
    )
      .pipe(repeatWhen(() => this.retry$))
      .subscribe(val => console.log('val = ', val));

    this.productForm = this.formBuilder.group({
      id: [this.product.id],
      name: [this.product.name, [ValidatorsCustom.required(), ValidatorsCustom.minLength(4)]],
      description: [
        this.product.description,
        [ValidatorsCustom.required(), ValidatorsCustom.maxLength(50)]
      ],
      trademark: [this.product.trademark, [ValidatorsCustom.required()]],
      price: [this.product.price, [ValidatorsCustom.required(), ValidatorsCustom.min(0)]],
      year: [
        this.product.year,
        [
          ValidatorsCustom.required(),
          ValidatorsCustom.min(1900),
          ValidatorsCustom.betweenYear(1900, new Date().getFullYear())
        ]
      ],
      photo: [this.product.photo]
    });

    // this.productForm.get('name').markAsPristine();
    // this.productForm.get('name').markAsUntouched();

    // this.productForm.get('name').errors;

    // this.productForm.setValue(this.product);
    /* this.productForm = new FormGroup({
      id: new FormControl( this.product.id),
      name: new FormControl( this.product.name, [Validators.required, Validators.minLength(4)]),
      description: new FormControl( this.product.description, [Validators.required, Validators.maxLength(50)]),
      trademark: new FormControl( this.product.trademark, [Validators.required]),
      price: new FormControl(this.product.price, [Validators.required, Validators.min(0)]),
      year:  new FormControl( this.product.year, [ Validators.required, Validators.min(1900),
          ValidatorsCustom.betweenYear(1900, new Date().getFullYear())
        ]
      ),
      photo: new FormControl( [this.product.photo])
    }); */

    // Escuchar cambios del FormControl 'name'
  }

  onSubmit() {
    console.log(this.productForm.value);
    this.retry$.next();
    // Guardar cambios del producto usando un Service(productService)
  }

}
