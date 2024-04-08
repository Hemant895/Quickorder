import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { cart } from 'src/app/shared/models/Cart';
import { cartitem } from 'src/app/shared/models/Cartitem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  
  ngOnInit(): void {
  }
  cart!:cart;
  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
   }
  removeFromCart(cartItem:cartitem){
    this.cartService.removeFromCart(cartItem.food.id);
    // console.log( cartItem.food.id)
  }

  changeQuantity(cartItem:cartitem,quantityInString:string){
   const  quantity = parseInt(quantityInString);
    // console.log(quantity);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }
}
