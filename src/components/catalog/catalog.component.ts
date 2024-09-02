import {Component, OnInit} from '@angular/core';
import {products} from "../../data/products.data";
import {Product} from "../../models/product";
import {ProductCartComponent} from "../product-cart/product-cart.component";
import {DataSharingService} from "../../services/data-sharing.service";
import {Store} from "@ngrx/store";
import {load} from "../../store/products.actions";

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCartComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  product!: Product[];

  constructor(
    private dataSharingService: DataSharingService,
    private store: Store<{ products: any }>) {
    this.store.select('products').subscribe(state => this.product = state.products)
  }

  ngOnInit(): void {
    this.store.dispatch(load())
  }

  onAddCart(product: Product) {
    this.dataSharingService.productEvent.emit(product);
  }

  protected readonly products = products;


}
