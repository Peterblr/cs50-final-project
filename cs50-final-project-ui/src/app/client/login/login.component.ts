import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  message = "";
  className = '';
  type = "password";
  isText = false;
  eyeIcon = "fa-eye-slash";

  constructor(private fb: FormBuilder,
    private navService: NavigationService,
    private utilityService: UtilityService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ],
      ],
      pwd: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
      rpwd: [''],
    })
  }

  login() {
    debugger;
    this.navService
    .loginUser(this.Email.value, this.PWD.value)
    .subscribe((res: any) => {
      if (res.toString() !== 'invalid') {
        this.className = 'text-success';
        this.message = 'Logged is Successfully';
        this.utilityService.setUser(res.toString());
        this.loginForm.disabled;
      } else {
        this.className = 'text-danger';
        this.message = 'Invalid Email or Password!'        
      }
    });
  }

  hidePassword(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  get Email() : FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get PWD() : FormControl {
    return this.loginForm.get('pwd') as FormControl;
  }

}
