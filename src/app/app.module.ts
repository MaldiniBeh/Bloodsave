import { FortoforComponent } from './fortofor/fortofor.component';
import { AdminGuard } from './admin/admin-auth/admin.guard';
import { EquipComponent } from './admin/admin-inter/equip/equip.component';
import { DonorComponent } from './admin/admin-inter/donor/donor.component';
import { RapportComponent } from './admin/admin-inter/rapport/rapport.component';
import { HistoComponent } from './admin/admin-inter/histo/histo.component';
import { CampComponent } from './admin/admin-inter/camp/camp.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { AdminAuthComponent } from './admin/admin-auth/admin-auth.component';
import { ParticlesModule } from 'angular-particle';
import { AdminInterComponent } from './admin/admin-inter/admin-inter.component';
import {DashComponent} from './admin/admin-inter/dash/dash.component';
import { ProfileComponent } from './admin/admin-inter/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment.prod';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ScriptLoaderModule} from 'ngx-script-loader';
import {NgCircleProgressModule} from 'ng-circle-progress';
import { ReachPipePipe } from './shared/reach-pipe.pipe';
const mrouter: Routes = [
   {path: '', component: ClientComponent, pathMatch : 'full' },
  {path: 'campAdmin', component: AdminComponent},
  {path: 'hostAdmin', component: AdminInterComponent, canActivate: [AdminGuard], children: [
    {path: '', component: DashComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'camp', component: CampComponent},
    {path: 'histo', component: HistoComponent},
    {path: 'rapport', component: RapportComponent},
    {path: 'donor', component: DonorComponent},
    {path: 'equip', component: EquipComponent},
   ]
},
  {path: 'not-found', component: FortoforComponent},
  {path : '**', redirectTo: 'not-found'}
];
 /* "particles.js": "^2.0.0",*/
//  ,
//  "postinstall": "ngcc  in package.json after ng e2e"
// tslint:disable-next-line: jsdoc-format
/**"aot":false in angular.json */
/*,
"angularCompilerOptions": {
  "enableIvy": false
  In tsconfig.app.json end line
}
*/
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ClientComponent,
    AdminAuthComponent,
    AdminInterComponent,
    DashComponent,
    ProfileComponent,
    HistoComponent,
    CampComponent,
    DonorComponent,
    RapportComponent,
    EquipComponent,
       FortoforComponent,
       ReachPipePipe
     ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(mrouter),
    ParticlesModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ScriptLoaderModule,
    NgCircleProgressModule.forRoot({
      "radius": 100,
      "maxPercent":100,
      "space": -10,
       "outerStrokeWidth": 20,
      "outerStrokeColor": "#4882c2",
      "innerStrokeColor": "#e7e8ea",
      "innerStrokeWidth": 10,
      "title": "UI",
      "animateTitle": false,
      "animationDuration": 1000,
      "showUnits": false,
      "showBackground": false,
        "clockwise": false,
      "startFromZero": false,
               })
  ],
  providers: [AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
