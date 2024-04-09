import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { sample_foods } from 'src/data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { FoodData } from '../_helpers/food.interface';
@Injectable({
  providedIn: 'root'
})
export class FoodService {


  constructor(private http:HttpClient) { }

  getAll():Observable<Food[]>{
  return this.http.get<Food[]>(environment.baseUrl)
  }
  getAllFoodsBySearchTerm(searchTerm:string):Observable<Food[]>{
    return  this.http.get<Food[]>(environment.searchUrl + searchTerm);
  }
  getFoodById(foodId:string):Observable<Food[]>{
    return this.http.get<Food[]>(environment.baseUrl+'/' + foodId);
  }
  placeOrders(obj:any){
    return this.http.post('https://quickorder-backend.vercel.app/orders/placedorders',obj);
  }
  getFoodOrders():Observable<FoodData> {
    return this.http.get<FoodData>("https://quickorder-backend.vercel.app/orders/ordersapi")
    }
  // sample_foods.filter((food)=>food.name.toLowerCase().includes(searchTerm.toLowerCase()));
}
