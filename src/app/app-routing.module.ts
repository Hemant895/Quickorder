import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { NotfoundComponent } from './components/header/notfound/notfound.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AuthGuard } from './_helpers';
import { OrdersComponent } from './components/pages/orders/orders.component';

const routes: Routes = [
  {
    path:'', component:HomeComponent
  },
  
  {
    path:'home', component:HomeComponent
  },
  {
    path:'search/:searchTerm', component:HomeComponent
  },
  {
    path:'signup', component:SignupComponent
  },
  {
    path:'login', component:LoginComponent
  },
  {path:'food/:_id', component:FoodPageComponent ,canActivate: [AuthGuard] },
  {path:'cart-page', component:CartPageComponent},
  {path:'checkout', component:CheckoutPageComponent,canActivate: [AuthGuard] },
  {path:'orders', component:OrdersComponent,canActivate: [AuthGuard] },
  {
    path:'**', component:NotfoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
