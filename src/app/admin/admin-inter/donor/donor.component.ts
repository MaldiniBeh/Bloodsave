import { ManageService } from './../../../service/manage.service';
import { Donnor } from './../../../shared/user-inerface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.scss']
})
export class DonorComponent implements OnInit {
Donnor: Donnor[] | undefined;
isload = false;
  constructor(private manSer: ManageService) { }

  ngOnInit(): void {
   this.isload = true;
   this.manSer.getDonnor()?.subscribe(donnor => {
      this.Donnor = donnor;
      this.isload = false;
    });
  }

}
