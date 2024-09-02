import {Injectable} from "@angular/core";
import {ProductService} from "../../services/product.service";
import {createEffect, ofType, Actions} from "@ngrx/effects";
import {findAll, load} from "../products.actions";
import {exhaustMap, map} from "rxjs";

@Injectable()
export class ProductsEffects {

  loadProduct$ = createEffect(
    () => this.actions$.pipe(
      ofType(load),
      exhaustMap(() => this.service.findAll())
    ).pipe(map(products => (findAll({products}))))
  );

  constructor(
    private actions$: Actions,
    private service: ProductService) {
    console.log('Actions:', actions$);
  }

}
