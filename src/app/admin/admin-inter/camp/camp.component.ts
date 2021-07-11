// tslint:disable-next-line: import-spacing
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { User, Camp } from './../../../shared/user-inerface';
import { ManageService } from './../../../service/manage.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-camp',
  templateUrl: './camp.component.html',
  styleUrls: ['./camp.component.scss']
})
export class CampComponent implements OnInit, OnDestroy {
  Campagne: FormGroup | undefined;
  Mate: FormGroup | undefined;
  forinf: FormGroup | undefined;
  userInf: any;
  userAcc: any;
  userPrele: any;
  Tools: any;
  arrayInf = new Array();
  arrayPrele = new Array();
  arrayAcc = new Array();
  Campa: Camp = {};
  tstbool = true;
    timesup!: string;
  subcribcust: Subscription | undefined;
  constructor(private managSer: ManageService, private afs: AngularFirestore) { }
  ngOnInit(): void {
                 const y =  new Date().getFullYear();
                 const d = new Date().getDate();
                 const m = 1 + new Date().getMonth();
                 this.timesup = y + '-' + m + '-' + d;

                 this.Campagne = new FormGroup({
      date: new FormControl(null, [Validators.required]),
      ville: new FormControl(null, [Validators.required]),
      lieu: new FormControl(null, [Validators.required]),
      desc: new FormControl(null, [Validators.required]),
      timed: new FormControl(null, [Validators.required]),
      timef: new FormControl(null, [Validators.required])
    });
    // Validators.min(new Date().getMinutes() + 60)]
                 this.Mate = new FormGroup({
      tabmat: new FormArray([
        new FormGroup({
          libele: new FormControl(null, [Validators.required]),
          qte: new FormControl(null, [Validators.required, Validators.min(1)])
        })
            ])
    });
                 this.forinf = new FormGroup({
      inf: new FormControl(null, [Validators.required]),
      pre:  new FormControl(null, [Validators.required]),
      acc:   new FormControl(null, [Validators.required]),
        });
                 this.OnUserInfirm();
                 this.OnUserAcc();
                 this.OnUserPrele();
                 this.OnMterel();
  }
   // tslint:disable-next-line: typedef
  onAddmat() {
    (this.Mate?.get('tabmat') as FormArray).push(new FormGroup({
      libele: new FormControl(null, [Validators.required]),
      qte: new FormControl(null, [Validators.required, Validators.min(1)])
    }));

  }
  // tslint:disable-next-line: typedef
  OnMterel() {
    this.subcribcust = this.managSer.OngetMate()?.subscribe((tool: any) => {
      this.Tools = tool[0].Libele;
    });
  }
  // tslint:disable-next-line: typedef
  onDeletemat(index: number) {
    (this.Mate?.get('tabmat') as FormArray).removeAt(index);
  }
  // tslint:disable-next-line: typedef
  OnUserInfirm() {
    this.subcribcust = this.managSer.Ongetusertype('Infirmier')?.subscribe(user => {
      this.userInf = user;

    });
  }
  // tslint:disable-next-line: typedef
  oncheckuser(event: any, id: any, name: any, last: any, typeuser: number) {
    switch (typeuser) {
      case 0:
        const toto = this.arrayInf.findIndex(el => el === id);
        if (event) {
          if (toto === -1) {
            this.arrayInf.push({ id, name, last });
          }
        }
        else {
          if (toto !== -1) {
            this.arrayInf.splice(toto, 1);
          }
        }
        break;

      case 1:
        const totoe = this.arrayAcc.findIndex(el => el === id);
        if (event) {
          if (totoe === -1) {
            this.arrayAcc.push({ id, name, last });
          }
        }
        else {
          if (totoe !== -1) {
            this.arrayAcc.splice(totoe, 1);
          }
        }
        break;
      case 2:
        const totoa = this.arrayPrele.findIndex(el => el === id);
        if (event) {
          if (totoa === -1) {
            this.arrayPrele.push({ id, name, last });
          }
        }
        else {
          if (totoa !== -1) {
            this.arrayPrele.splice(totoa, 1);
          }
        }
        break;
      default:
        break;
    }
  }

  // tslint:disable-next-line: typedef
  OnUserAcc() {
    this.subcribcust = this.managSer.Ongetusertype('Acceuil')?.subscribe(user => {
      this.userAcc = user;
    });
  }
  // tslint:disable-next-line: typedef
  OnUserPrele() {
    this.subcribcust = this.managSer.Ongetusertype('Prélèvement')?.subscribe(user => {
      this.userPrele = user;
    });
  }

  // tslint:disable-next-line: typedef
  OnlanceCamp() {
    if (!this.Campagne?.invalid &&
       !this.Mate?.invalid &&
              this.arrayAcc.length > 0 &&
        this.arrayInf.length > 0 &&
         this.arrayPrele.length > 0) {
           const deput = this.timesup + ',' + this.Campagne?.value.timed;
           const end = this.timesup + ',' + this.Campagne?.value.timef;
          //  console.log(new Date(deput));
          //  console.log(new Date(end));

           if (new Date(end) <= new Date(deput)){
            Swal.fire({
              icon: 'info',
              title: 'Réglage d\'horloge...',
              text: 'L\'heure de départ doit-être inférieur à l\'heure de fin. Vérifier et réessayer '
                  });
           }
            else{
        this.Campa = {
                Codecamp: new Date().getTime()  ,
                Datecapm: this.Campagne?.value.date,
                Description: this.Campagne?.value.desc,
                Lieucamp: this.Campagne?.value.lieu,
                heure_dep: this.Campagne?.value.timed,
                heure_fin: this.Campagne?.value.timef,
                equipe: { acceuil: this.arrayAcc, infirmier: this.arrayInf, prelevement: this.arrayPrele },
                materiel: this.Mate?.controls.tabmat.value
              };

        this.managSer.OnaddCamp(this.Campa)?.then(() => {
                Swal.fire({
                  icon: 'success',
                  title: 'Campagne Lancée...',
                  text: 'Campagne lancée avec succès '

                }).then(() => {
                  this.Campagne?.reset();
                  this.Mate?.reset();
                  this.forinf?.reset();
                        });
              });
           }



    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Campagne Echouée...',
        text: 'Vérifier les informations et réessayer '

      });
    }

  }
  ngOnDestroy(): void {
    if (this.subcribcust) {
      this.subcribcust.unsubscribe();
    }
  }
}
