import { Donnor, Camp } from './../../../shared/user-inerface';
import { Subscription } from 'rxjs';
import { ManageService } from './../../../service/manage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScriptService } from 'ngx-script-loader';
import { User } from 'src/app/shared/user-inerface';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit, OnDestroy {
  Users: User[] | undefined;
  Donnors: Donnor[] | undefined;
  Campa: any;
  subcription: Subscription | undefined;
  constructor(private ngxscrip: ScriptService, private manag: ManageService) {
    this.ngxscrip.loadScript('/assets/cssb/bootstrap/dist/js/bootstrap.bundle.min.js').subscribe(() => {
      this.ngxscrip.loadScript('/assets/jsb/js/app-style-switcher.js').subscribe(() => {
        this.ngxscrip.loadScript('/assets/cssb/plugins/bower_components/jquery-sparkline/jquery.sparkline.min.js').subscribe(() => {
          this.ngxscrip.loadScript('/assets/jsb/js/waves.js').subscribe(() => {
            this.ngxscrip.loadScript('/assets/jsb/js/sidebarmenu.js').subscribe(() => {
              this.ngxscrip.loadScript('/assets/jsb/js/sidebarmenu.js').subscribe(() => {
                this.ngxscrip.loadScript('/assets/jsb/js/custom.js').subscribe(() => {
                  this.ngxscrip.loadScript('/assets/cssb/plugins/bower_components/chartist/dist/chartist.min.js').subscribe(() => {
                    this.ngxscrip.loadScript('/assets/cssb/plugins/bower_components/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.min.js').subscribe(() => {
                      console.log('finis');

                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }
  ngOnDestroy(): void {
    this.subcription?.unsubscribe();
  }

  ngOnInit(): void {
    this.subcription = this.manag.getUser()?.subscribe(user => {
      this.Users = user;
    });
    this.subcription = this.manag.getDonnor()?.subscribe(don => {
      this.Donnors = don;
    });
    this.subcription =  this.manag.OngetCamp()?.subscribe(camp => {
      this.Campa = camp;
    });
  }

}
