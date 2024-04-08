import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  data: any;
  submitted = false;
  show_button: Boolean = false;
  show_eye: Boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authservice: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['',  [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]],
      password: ['',  [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40)
      ]],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }
  OnSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    if (
      this.loginForm.value.number === '' &&
      this.loginForm.value.password === '' &&
      this.loginForm.value.email === ''
    ) {
      this.toastr.error('please enter all the fields');
    }
    let loginrequest: any = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    this.authservice.loginApi(loginrequest).subscribe({
      next: (res:any) => {
        if(res.status ==200)
        {this.toastr.success("logged in sucessfully ");
        this.data = res;
        this.loginForm.reset();
        this.router.navigate(['/home'])
        // console.log(this.data);
        localStorage.setItem("sessionstorage", JSON.stringify( this.data))
        localStorage.setItem("data", JSON.stringify(this.data))
        localStorage.setItem("token", this.data.token)
        localStorage.setItem("username", this.data.username)
        localStorage.setItem("email", this.data.email)
        localStorage.getItem('token')
      }
      else {
        console.log(this.toastr.error(res.message));
      }
      },
      error: (err) => {
        if ((err)) {
        this.toastr.error(err);
          return;
        } else if ((err.status = '403')) {
          this.toastr.error(err.message);
          return;
        } else if ((err.status = '412')) {
          this.toastr.error(err.message);
          return;
        }
         else {
          this.toastr.error(err.message);
        }
      },
    });
  }

}
