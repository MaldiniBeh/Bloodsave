import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/shared/user-inerface';
import { Camp, Zone } from './../../../shared/user-inerface';
import { Subscription } from 'rxjs';
import { ManageService } from './../../../service/manage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-histo',
  templateUrl: './histo.component.html',
  styleUrls: ['./histo.component.scss']
})
export class HistoComponent implements OnInit {
  Campfix: Camp[] | undefined;
  usernameeq!: User[];
  mzone: Zone = {};
  istobtn = false;
  // istobtf = true;
  constructor(private manaServ: ManageService,
              private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.manaServ.OngetCamp()?.subscribe(camp => {
      this.Campfix = camp;
    });
  }
  // tslint:disable-next-line: typedef
  Ontoglebtn(i: number) {
    console.log(i);

    if (i % 2 === 0) {
      this.istobtn = !this.istobtn;
    }
    // else {
    //   this.istobtf = !this.istobtf;
    // }

  }
}

