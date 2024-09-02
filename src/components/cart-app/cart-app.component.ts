import {Component, OnInit} from '@angular/core';
import {CatalogComponent} from '../catalog/catalog.component';
import {CartComponent} from '../cart/cart.component';
import {CartItems} from '../../models/cart-items';
import {NavbarComponent} from '../navbar/navbar.component';
import {NotificationService} from "../../services/notification-service.service";
import {Router, RouterOutlet} from "@angular/router";
import {DataSharingService} from "../../services/data-sharing.service";
import {Store} from "@ngrx/store";
import {ItemsState} from "../../store/items.reducer";
import {add, remove} from "../../store/items.actions";
import {Product} from "../../models/product";

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, CartComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
  styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit {

  items: CartItems[] = [];

  constructor(
    private sharingDataService: DataSharingService,
    private notificationService: NotificationService,
    private router: Router,
    private store: Store<{ items: ItemsState }>
  ) {
    this.store.select('items').subscribe(state => {
      this.items = state.items;
      this.updateLocalStorage();
    })
  }

  ngOnInit() {
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(): void {
    this.sharingDataService.productEvent.subscribe((product: Product) => {
      this.store.dispatch(add({ product }));
    });
  }

  onDeleteCart(): void {
    this.sharingDataService.idProduct.subscribe(id => {
      this.store.dispatch(remove({ id }));
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/cart']);
      });
    });
  }

  updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.items));
  }

  createAlert(message: string, type: string) {
    this.notificationService.showNotification(message, type);
  }

}
