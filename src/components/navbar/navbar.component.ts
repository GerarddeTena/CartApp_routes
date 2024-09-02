import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CartComponent} from "../cart/cart.component";
import {CartItems} from "../../models/cart-items";
import {Environment} from "@angular/cli/lib/config/workspace-schema";
import {RouterModule} from "@angular/router";
import {Product} from "../../models/product";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @Input() items: CartItems[] = [];

}
