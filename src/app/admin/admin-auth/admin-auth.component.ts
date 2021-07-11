import { User } from './../../shared/user-inerface';
import { AuthService } from './../../service/auth-service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.scss']
})

export class AdminAuthComponent implements OnInit {
  isLogin = true;
 // waitaction = false;
   myStyle: object = {};
  myParams: object = {};
  Conneform: FormGroup | undefined;
  Insform: FormGroup | undefined;
  // tslint:disable-next-line: no-inferrable-types
  width: number = 100;
  // tslint:disable-next-line: no-inferrable-types
  height: number = 100;
  constructor(private authervice: AuthService) { }
  ngOnInit(): void {
    this.myStyle = {
      // tslint:disable-next-line: object-literal-key-quotes
      'position': 'fixed',
      // tslint:disable-next-line: object-literal-key-quotes
      'width': '100%',
      // tslint:disable-next-line: object-literal-key-quotes
      'height': '100%',
      'z-index': -1,
      // tslint:disable-next-line: object-literal-key-quotes
      'top': 0,
      // tslint:disable-next-line: object-literal-key-quotes
      'left': 0,
      // tslint:disable-next-line: object-literal-key-quotes
      'right': 0,
      // tslint:disable-next-line: object-literal-key-quotes
      'bottom': 0
    };

    this.myParams = {
      particles: {
        number: {
          value: 95,

        },
        size: {
          value: 5
        },
        color: {
          value: '#000000'
        },

        shape: {
          type: 'circle',
        },
      }
    };
    this.Conneform = new FormGroup({
      pass: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      mail: new FormControl(null, [Validators.required, Validators.email])

    }
    );
    this.Insform = new FormGroup({
      usernamelast: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      insmail: new FormControl(null, [Validators.required, Validators.email]),
      inspass: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

  }

  Onswichmode(): void {
    this.isLogin = !this.isLogin;
  }

  OnFormeconnect(): void {
    // console.log(this.waitaction);

    // this.waitaction = true;
   // console.log(this.waitaction);
    const mail = this.Conneform?.value.mail;
    const pass = this.Conneform?.value.pass;
    this.authervice.Onsignin(mail, pass);
    // .then(() => this.waitaction = false);
  }
  OnFormelogin(): void {
    const mail = this.Insform?.value.insmail;
    const pass = this.Insform?.value.inspass;
    const name = this.Insform?.value.username;
    const last = this.Insform?.value.usernamelast;
    this.authervice.Onsignup(mail, pass, name, last);
    this.isLogin = true;
  }
  async Onforgetpass(): Promise<void> {
    const { value: email } = await Swal.fire({
      title: 'Saisir email de réinitialisation du mot de passe. ',
      input: 'email',
      inputPlaceholder: 'Entrer addresse Email'
    });

    if (email) {
      this.authervice.OnpasswordRecover(email);
    }
  }

}
