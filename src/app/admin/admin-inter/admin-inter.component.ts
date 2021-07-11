import { ManageService } from './../../service/manage.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { User } from './../../shared/user-inerface';
import { AuthService } from './../../service/auth-service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-inter',
  templateUrl: './admin-inter.component.html',
  styleUrls: ['./admin-inter.component.scss']
})
export class AdminInterComponent implements OnInit {
  tabuser: User [] | undefined;
  filtadm: string | undefined;
  isload = false;
  subcriptioncu!: Subscription;
  constructor(private authservice: AuthService,
              private firestore: AngularFirestore, private manag: ManageService ) {
                  }

  ngOnInit(): void {
    this.isload = true;
    this.subcriptioncu = this.authservice.Onuserfirebase()?.subscribe(user => {
         this.tabuser = user;
         this.isload = false;
           });
                }

  OnadminLogout(): void {
    this.authservice.Onlogout();
    }
    // tslint:disable-next-line: typedef
    toto(value: string){
      this.manag.filter = value;
     }
}
