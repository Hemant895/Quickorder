import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  private modalService = inject(NgbModal);
  signupForm: FormGroup | any;
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
    this.signupForm = this.formBuilder.group({
      username: ['',  [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]],
      email: ['', [Validators.required, Validators.email]],
      number: ['', [Validators.required, Validators.minLength(10)]],
      password: ['',  [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(40)
      ]],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }
  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }
  OnSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }
    if (
      this.signupForm.value.number === '' &&
      this.signupForm.value.password === '' &&
      this.signupForm.value.email === ''
    ) {
      this.toastr.error('please enter all the fields');
    }
    let SignUprequest: any = {
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      phone: this.signupForm.value.number,
      userType: 'Admin',
    };
    this.authservice.singupApi(SignUprequest).subscribe({
      next: (res:any) => {
        if(res.status ==200)
        {this.toastr.success("sucessfully created");
        this.data = res;
        this.signupForm.reset();
        this.router.navigate(['/login'])
        console.log(this.data);
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
          this.toastr.error(err.messager);
          return;
        } else {
          this.toastr.error(err.message);
        }
      },
    });
  }
  openVerticallyCentered(content: TemplateRef<any>) {
    this.modalService.open(content, {
      centered: true,
      windowClass: 'myCustomModalClass',
    });
  }
}

// if (res.status == "200") {
//   this.toastr.success(res.message);
//   this.data = res
//   console.log(res.error)
//   console.log(this.data)
//   localStorage.setItem("sessionstorage", JSON.stringify(res.data))
//   localStorage.setItem("id", JSON.stringify(res.data["recordsets"][0]["ID"]))
// }
// else if (res.status = "500") {
//   this.toastr.error(res.error)
//   return
// }
// else if (res.status = "403") {
//   this.toastr.error(res.error)
//   return
// }
// else if (res.status = "412") {
//   this.toastr.error(res.error)
//   return
// }
// else {
//   this.toastr.error("res.message")
// }
