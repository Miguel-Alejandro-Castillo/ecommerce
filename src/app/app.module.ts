import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BadgeComponent } from './components/badge/badge.component';
import { ButtonComponent } from './components/button/button.component';
import { MessagesErrorComponent } from './components/forms/messages-error/messages-error.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ButtonsShopComponent } from './components/product/buttons-shop/buttons-shop.component';
import { DialogCartProductsComponent } from './components/product/dialog-cart-products/dialog-cart-products.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { ListProductsComponent } from './components/product/list-products/list-products.component';
import { ProductCardComponent } from './components/product/product-card/product-card.component';
import { ProductSearchComponent } from './components/product/product-search/product-search.component';
import { FormFieldComponent } from './components/forms/form-field/form-field.component';
import {LayoutModule} from '@angular/cdk/layout';
import {PortalModule} from '@angular/cdk/portal';
import { HeaderComponent } from './components/template/header/header.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoadingComponent } from './components/template/loading/loading.component';

import {DialogModule} from 'primeng/dialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { BattleModule } from './modules/battle/battle.module';

const routes: Routes = [
  {
    path: 'products/edit/:id',
    component: EditProductComponent
  },
  {
    path: 'products/list',
    component: ListProductsComponent
  },
  { path: 'battle', loadChildren: './modules/battle/battle.module#BattleModule' },
  {
    path: '',
    redirectTo: '/products/list',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    BadgeComponent,
    ListProductsComponent,
    ProductCardComponent,
    ProductSearchComponent,
    DialogCartProductsComponent,
    ButtonsShopComponent,
    PaginatorComponent,
    EditProductComponent,
    MessagesErrorComponent,
    FormFieldComponent,
    HeaderComponent,
    LoadingComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    LayoutModule,
    PortalModule,
    /* Modules for primeng */
    DialogModule,
    ProgressSpinnerModule,
    /*                     */
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatExpansionModule,
    MatMenuModule,
    MatDialogModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogCartProductsComponent]
})
export class AppModule {
}
