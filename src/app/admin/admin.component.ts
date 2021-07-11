import { AuthService } from './../service/auth-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private userall: AuthService) { }

  ngOnInit(): void {
    // console.log(this.userall.OngetUser());
      }

}
