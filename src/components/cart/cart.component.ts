import {Component, OnInit} from '@angular/core';
import {CartItems} from '../../models/cart-items';
import {Router, RouterLink} from "@angular/router";
import {DataSharingService} from "../../services/data-sharing.service";
import {Store} from "@ngrx/store";
import {ItemsState} from "../../store/items.reducer";
import {total} from "../../store/items.actions";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  items: CartItems[] = [];
  total: number = 0;

  constructor(
    private sharingDataService: DataSharingService,
    private store: Store<{items: ItemsState}>
    ) {
    this.store.select('items').subscribe(state => {
      this.items = state.items;
      this.total = state.total;
    });

  }

  ngOnInit() {
    this.store.dispatch(total());
  }

  onDeleteCart(id: number) {
    this.sharingDataService.idProduct.emit(id);
  }
}
