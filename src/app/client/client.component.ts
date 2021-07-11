import { Camp } from './../shared/user-inerface';
import { AngularFirestore } from '@angular/fire/firestore';
import { ManageService } from './../service/manage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  Campfix: Camp[] | undefined;
  isload = false;
  constructor(private manaServ: ManageService,
              private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.isload = true;
    this.manaServ.OngetCamp()?.subscribe(camp => {
      this.Campfix = camp;
      this.isload = false;
    });
  }

}

