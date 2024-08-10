import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../models/product";
import {products} from "../../data/products.data";
import {NotificationService} from "../../services/notification-service.service";

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [],
  templateUrl: './product-cart.component.html',
  styleUrl: './product-cart.component.css'
})
export class ProductCartComponent {
  @Input() product!: Product;
  @Output() productEvent: EventEmitter<Product> = new EventEmitter();

  constructor(private notificationService: NotificationService) {
  }
  onAddCart(product: Product) {
    this.productEvent.emit(product);
    this.notificationService.showNotification('Successfully added to cart', 'success');
  }

  protected readonly products = products;
}
