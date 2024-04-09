import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { FoodData } from 'src/app/_helpers/food.interface';
import { FoodService } from 'src/app/services/food.service';

interface Food {
  id: string;
  name: string;
  price: number;
  tag: string[];
  favorite: boolean;
  stars: number;
  imgurl: string;
  origins: string[];
  cooktime: string;
  _id: string;
}
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})

export class OrdersComponent implements OnInit {
  orders: FoodData|any;
  email:any;
  emaildata:any;
  orderEmail:any
  filteredData:any
  username:any
  constructor( private foodorder:FoodService) { }

  ngOnInit(): void {

      this.getOrders()
   
      this.email = localStorage.getItem('email');
      this.username =  localStorage.getItem('username')
      // this.orderEmail = localStorage.getItem('orderemail')
  }

  getOrders():void{
    this.foodorder.getFoodOrders().subscribe((data)=>{
      // console.log(this.emaildata.email)
      this.filteredData = data.filter(item => item.email === this.email);
          this.orders = this.filteredData ;
      // console.log( this.email)
        // this.orders= data;
        console.log(this.orders);
    });
  }
 
}
