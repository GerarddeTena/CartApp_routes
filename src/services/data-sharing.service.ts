import {EventEmitter, Injectable} from '@angular/core';
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private _idProduct: EventEmitter<number> = new EventEmitter();
  private _productEvent: EventEmitter<Product> = new EventEmitter();

  constructor() { }

  get idProduct(): EventEmitter<number> {
    return this._idProduct
  }

  get productEvent(): EventEmitter<Product> {
    return this._productEvent
  }



}
