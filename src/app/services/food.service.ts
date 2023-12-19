import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { sample_foods } from 'src/data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
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
  // sample_foods.filter((food)=>food.name.toLowerCase().includes(searchTerm.toLowerCase()));
}
