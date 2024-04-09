import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { cart } from 'src/app/shared/models/Cart';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  
  ordersForm: FormGroup | any;
  data: any;
  submitted = false;
  show_button: Boolean = false;
  show_eye: Boolean = false;
  email:any;
test:any
final:any
  cart!:cart;
  constructor(private cartService: CartService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private foodorder:FoodService
    
    ) {
      setInterval(()=>{
        this.cart
      },100)
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart  = cart;
      // console.log(this.cart);
    })
    
   }

  ngOnInit(): void {
    this.ordersForm = this.formBuilder.group({
      data:[],
      email:[''],
      billingaddress:this.formBuilder.group({
        street: [''],
        zipcode: [''],

       }),
    });
   this.email = localStorage.getItem('email')
  
  }

  get f(): { [key: string]: AbstractControl } {
    return this.ordersForm.controls;
  }




  OnSubmit() {
    // this.submitted = true;

    // if (this.ordersForm.invalid) {
    //   return;
    // }
    if (this.ordersForm.invalid) {
      return;
    }
    
    const billingAddressGroup = this.ordersForm.get('billingaddress') as FormGroup;

    if (
      billingAddressGroup.get('street')?.value === '' &&
      billingAddressGroup.get('zipcode')?.value === '' &&
      this.ordersForm.value.email === ''
    ) {
      this.toastr.error('Please enter all the fields');
    }
    let ordersRequest: any = {
      data:this.cart,
      email: this.ordersForm.value.email,
      billingaddress:{
        street:billingAddressGroup.get('street')?.value ,
        zipcode: billingAddressGroup.get('zipcode')?.value,

       },

    };
   console.log(ordersRequest)
    this.foodorder.placeOrders(ordersRequest).subscribe({
      next: (res:any) => {
        if(res.success == true )
        {this.toastr.success("order sucessfully placed");
        this.data = res;
        localStorage.setItem("orderemail", this.data.email)
        this.ordersForm.reset();
        this.router.navigate(['/orders'])
        // console.log(this.data);
        
        localStorage.removeItem('Cart');
        // localStorage.setItem("data", JSON.stringify(this.data))
        // localStorage.setItem("token", this.data.token)
        // localStorage.setItem("username", this.data.username)
        // localStorage.setItem("email", this.data.email)
        // console.log( localStorage.getItem('token'));
      }
      },
      error: (err:any) => {
        this.toastr.error(err);

      },
    });


   
  //  console.log(ordersRequest);
  }

}
