import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from './../../../shared/user-inerface';
import { ManageService } from './../../../service/manage.service';
import { Component, OnInit, AfterContentChecked } from '@angular/core';

// tslint:disable-next-line: no-conflicting-lifecycle
@Component({
  selector: 'app-equip',
  templateUrl: './equip.component.html',
  styleUrls: ['./equip.component.scss']
})
export class EquipComponent implements OnInit, AfterContentChecked {
  Users: User[] | undefined;
  valid: any;
  filtinit: string | undefined;
    constructor(private manag: ManageService) {
  }

  ngOnInit(): void {
  this.manag.getUser()?.subscribe(user => {
      this.Users = user;

    });
  }
  // tslint:disable-next-line: typedef
   ngAfterContentChecked(){
     this.filtinit = this.manag.filter;
     return this.filtinit;
            }

  // tslint:disable-next-line: typedef
  delUser(id: any) {
    this.valid = confirm('Voulez-vous vraiment supprimer?');
    if (this.valid === true) {
      this.manag.Ondeleteser(id);
    }
  }
  // tslint:disable-next-line: typedef
  async Upuser(user: any) {
    const { value: role } = await Swal.fire({
      title: 'Selectionnez le Rôle',
      input: 'select',
      inputOptions: {
        ' Rôle': {
          AdminG: 'Admin Générale',
          Acceuil: 'Acceuil',
          Infirmier: 'Infirmier',
          Prélèvement: 'Prélèvement',
          Simple: 'Simple'
        }
      },
      inputPlaceholder: 'Selectionnez le Rôle',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            this.manag.OnattrRole(user, value);

            Swal.fire({
              icon: 'success',
              title: 'Modification',
              text: 'Attribution du Rôle '
                + value +
                ' effectué avec succès'
            });

          } else {
            resolve('Veillez choisie un rôle');
          }
        });
      }
    });


  }

}
