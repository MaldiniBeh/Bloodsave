import Swal from 'sweetalert2';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../../service/auth-service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user-inerface';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  tabuser!: User[];
  profileUpdate: FormGroup | undefined;
  update: User = {};
  all = false;
  maile: any ;
  profilecompUpdate: FormGroup | undefined;
  subcription!: Subscription;
  constructor(private authservice: AuthService, private firedb: AngularFireAuth) { }

  ngOnInit(): void {
    this.subcription = this.authservice.Onuserfirebase()?.subscribe(user => {
      this.tabuser = user;
    });
    this.profileUpdate = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      prenom: new FormControl(null, [Validators.required]),
    });
    this.profilecompUpdate = new FormGroup({
      cname: new FormControl(null, [Validators.required]),
      cprenom: new FormControl(null, [Validators.required]),
     npass: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      });
  }
  // tslint:disable-next-line: typedef
  OnUpdateuseradm() {
    this.update = {
      name: this.profileUpdate?.value.name,
      last: this.profileUpdate?.value.prenom
    };

    this.authservice.Onuserupdate(this.update).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Modification',
        text: 'Profile modifier avec succès'
      });
      this.profileUpdate = new FormGroup({
        name: new FormControl('', [Validators.required]),
        prenom: new FormControl('', [Validators.required]),
      });
    });

  }
  // tslint:disable-next-line: typedef
  OnUpdateall() {

   this.update = {
      name: this.profilecompUpdate?.value.cname,
      last: this.profilecompUpdate?.value.cprenom
    };
   this.authservice.Onuserupdate(this.update).then(() => {
       this.firedb.currentUser.then((user) => {
       this.maile =  user?.email;
       Swal.fire({
        icon: 'info',
        title: 'Sécurité',
        text: 'Pour des raisons de sécurité nous vous avons envoyer un mail pour confirmer votre mot de passe'
      });
       this.profilecompUpdate = new FormGroup({
        cname: new FormControl('', [Validators.required]),
        cprenom: new FormControl('', [Validators.required]),
        npass: new FormControl('', [Validators.required, Validators.minLength(6)])
      });
       setTimeout(() => {
        this.authservice.OnpasswordRecover(this.maile);
      }, 5000);

       });
    });


  }
  // tslint:disable-next-line: typedef
  Onall() {
    this.all = !this.all;
  }
  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

}
